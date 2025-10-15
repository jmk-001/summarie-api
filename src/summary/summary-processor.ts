import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { WorkerService } from '../worker/worker.service';
import { SUMMARY_JOB_NAME } from './summary-constants';
import { SummaryLlmService } from './summary-llm.service';
import { SummaryJobService } from '../summary-job/summary-job.service';
import { SummaryResultService } from '../summary-result/summary-result.service';
import { SummaryJobStatus } from '../summary-job/models/summary-job-status.enum';

@Injectable()
export class SummaryProcessor implements OnModuleInit {
  private readonly logger = new Logger(SummaryProcessor.name);

  constructor(
    private boss: WorkerService,
    private summaryJobService: SummaryJobService,
    private summaryResultService: SummaryResultService,
    private llm: SummaryLlmService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.boss.instance.work(SUMMARY_JOB_NAME, async ([j]) => {
      const { jobId } = j.data as { jobId: string };

      const job = await this.summaryJobService.findById(jobId);
      await this.summaryJobService.updateForUser(job.userId, job.id, {
        status: SummaryJobStatus.running,
        startedAt: new Date(),
      });

      try {
        const existing = await this.summaryResultService.findByJobId(job.id);
        if (existing) {
          this.logger.warn(`Job ${j.id} already has a result. Skipping.`);
          await this.summaryJobService.updateById(job.id, {
            status: SummaryJobStatus.done,
            finishedAt: new Date(),
          });
          return;
        }

        const llmOutput = await this.llm.run(job.paramsSnapshot);

        await this.summaryResultService.createSummaryResult(job.userId, {
          jobId: job.id,
          content: llmOutput.content,
          model: job.model,
          tokensUsed: llmOutput.tokensUsed,
        });
        await this.summaryJobService.updateById(job.id, {
          status: SummaryJobStatus.done,
          finishedAt: new Date(),
        });
      } catch (e: any) {
        const errorString = e.message;
        // const attempts = j.attempts + 1;

        // update attempts + error msg
        // await this.prisma.summaryJob.update({
        //   where: { id: j.id },
        //   data: {
        //     attempts,
        //     error: errorString,
        //     status: attempts >= MAX_ATTEMPTS ? 'error' : 'queued',
        //     finishedAt: attempts >= MAX_ATTEMPTS ? new Date() : null,
        //   },
        // });

        // Let pg-boss handle retry based on your worker’s settings OR re-publish with backoff yourself.
        // Example manual backoff (optional):
        // const backoffMs = Math.min(60_000, 2 ** attempts * 1000);
        // await this.boss.instance.publish(SUMMARY_JOB_NAME, { jobId: j.id }, { startAfter: backoffMs });

        // Throw to signal failure to pg-boss (so it can retry if configured)
        throw e;
      }
    });
  }
}
