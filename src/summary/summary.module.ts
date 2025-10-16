import { Module } from '@nestjs/common';
import { WorkerModule } from '../worker/worker.module';
import { PrismaService } from '../prisma/prisma.service';
import { SummaryQueueService } from './services/summary-queue.service';
import { SummaryProcessor } from './summary-processor';
import { SummaryLlmService } from './services/summary-llm.service';
import { SummaryJobService } from '../summary-job/summary-job.service';
import { SummaryResultService } from '../summary-result/summary-result.service';
import { SummaryResolver } from './summary.resolver';
import { DocumentService } from '../document/document.service';

@Module({
  imports: [WorkerModule],
  providers: [
    PrismaService,
    SummaryQueueService,
    SummaryProcessor,
    SummaryLlmService,
    DocumentService,
    SummaryJobService,
    SummaryResultService,
    SummaryResolver,
  ],
  exports: [SummaryQueueService],
})
export class SummaryModule {}
