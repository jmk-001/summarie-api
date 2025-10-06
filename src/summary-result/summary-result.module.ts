import { Module } from '@nestjs/common';
import { SummaryResultResolver } from './summary-result.resolver';
import { SummaryResultService } from './summary-result.service';

@Module({
  providers: [SummaryResultResolver, SummaryResultService]
})
export class SummaryResultModule {}
