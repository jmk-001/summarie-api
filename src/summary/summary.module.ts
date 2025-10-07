import { Module } from '@nestjs/common';
import { WorkerModule } from '../worker/worker.module';
import { PrismaService } from '../prisma/prisma.service';
import { SummaryQueueService } from './summary-queue.service';
import { SummaryProcessor } from './summary-processor';
import { SummaryLlmService } from './summary-llm.service';
import { SummaryJobService } from '../summary-job/summary-job.service';
import { SummaryResultService } from '../summary-result/summary-result.service';

@Module({
  imports: [WorkerModule],
  providers: [
    PrismaService,
    SummaryQueueService,
    SummaryProcessor,
    SummaryLlmService,
    SummaryJobService,
    SummaryResultService,
  ],
  exports: [SummaryQueueService],
})
export class SummaryModule {}
