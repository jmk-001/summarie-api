import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { SummaryResult } from '../summary-result/models/summary-result.model';
import { SummaryQueueService } from './services/summary-queue.service';
import { PROCESS_SUMMARY_PUB_KEY, pubSub } from './summary-constants';

@Resolver()
@UseGuards(GqlAuthGuard)
export class SummaryResolver {
  constructor(private summaryQueueService: SummaryQueueService) {}

  @Subscription(() => SummaryResult, {
    name: 'processSummary',
    filter: (payload: any, variables: { jobId: string }) =>
      payload.processSummary?.jobId === variables.jobId,
    resolve: (payload: any) => payload.processSummary,
  })
  async processSummary(@Args('jobId', { type: () => String }) jobId: string) {
    await this.summaryQueueService.enqueue(jobId);
    return pubSub.asyncIterableIterator(PROCESS_SUMMARY_PUB_KEY);
  }
}
