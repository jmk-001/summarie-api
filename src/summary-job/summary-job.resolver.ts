import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SummaryJob } from './models/summary-job.model';
import { SummaryJobService } from './summary-job.service';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateSummaryJobInput } from './dto';

@Resolver()
@UseGuards(GqlAuthGuard)
export class SummaryJobResolver {
  constructor(private summaryJobService: SummaryJobService) {}

  @Mutation(() => SummaryJob)
  async createSummaryJob(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreateSummaryJobInput,
  ) {
    return this.summaryJobService.createForUser(user.id, data);
  }

  @Query(() => [SummaryJob], { name: 'summaryJobs' })
  async findSummaryJobs(@CurrentUser() user: { id: string }) {
    return this.summaryJobService.findManyForUser(user.id);
  }

  @Query(() => SummaryJob, { name: 'summaryJob' })
  async findSummaryJobById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryJobService.findForUser(user.id, id);
  }

  @Mutation(() => String)
  async deleteSummaryJobById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryJobService.deleteForUser(user.id, id);
  }
}
