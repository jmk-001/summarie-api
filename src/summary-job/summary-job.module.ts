import { Module } from '@nestjs/common';
import { SummaryJobResolver } from './summary-job.resolver';
import { SummaryJobService } from './summary-job.service';

@Module({
  providers: [SummaryJobResolver, SummaryJobService],
})
export class SummaryJobModule {}
