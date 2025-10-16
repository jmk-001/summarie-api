import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { WorkerService } from '../worker/worker.service';
import {
  PROCESS_SUMMARY_PUB_KEY,
  pubSub,
  SUMMARY_JOB_NAME,
} from './summary-constants';
import { SummaryLlmService } from './services/summary-llm.service';
import { SummaryJobService } from '../summary-job/summary-job.service';
import { SummaryResultService } from '../summary-result/summary-result.service';
import { SummaryJobStatus } from '../summary-job/models/summary-job-status.enum';
import { DocumentService } from '../document/document.service';

@Injectable()
export class SummaryProcessor implements OnModuleInit {
  private readonly logger = new Logger(SummaryProcessor.name);

  constructor(
    private boss: WorkerService,
    private documentService: DocumentService,
    private summaryJobService: SummaryJobService,
    private summaryResultService: SummaryResultService,
    private llm: SummaryLlmService,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.boss.instance.work(SUMMARY_JOB_NAME, async ([j]) => {
      const { jobId } = j.data as { jobId: string };

      const job = await this.summaryJobService.findById(jobId);
      const document = await this.documentService.findById(job.documentId);
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

        const llmOutput = await this.llm.run(
          document.content,
          job.paramsSnapshot,
        );

        const result = await this.summaryResultService.createSummaryResult(
          job.userId,
          {
            jobId: job.id,
            content: llmOutput.content,
            model: job.model,
            tokensUsed: llmOutput.tokensUsed,
          },
        );
        await this.summaryJobService.updateById(job.id, {
          status: SummaryJobStatus.done,
          finishedAt: new Date(),
        });

        await pubSub.publish(PROCESS_SUMMARY_PUB_KEY, {
          processSummary: result,
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
