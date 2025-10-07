import { Module } from '@nestjs/common';
import { SummaryJobResolver } from './summary-job.resolver';
import { SummaryJobService } from './summary-job.service';
import { SummaryModule } from '../summary/summary.module';

@Module({
  imports: [SummaryModule],
  providers: [SummaryJobResolver, SummaryJobService],
})
export class SummaryJobModule {}
