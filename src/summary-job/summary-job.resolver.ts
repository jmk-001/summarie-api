import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SummaryJob } from './models/summary-job.model';
import { SummaryJobService } from './summary-job.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateSummaryJobInput } from './dto';

@Resolver()
export class SummaryJobResolver {
  constructor(private summaryJobService: SummaryJobService) {}

  @Mutation(() => SummaryJob)
  async createSummaryJob(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreateSummaryJobInput,
  ) {
    return this.summaryJobService.createSummaryJob(user.id, data);
  }

  @Query(() => [SummaryJob], { name: 'summaryJobs' })
  async getSummaryJobs(@CurrentUser() user: { id: string }) {
    return this.summaryJobService.getSummaryJobs(user.id);
  }

  @Query(() => SummaryJob, { name: 'summaryJob' })
  async getSummaryJobById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryJobService.getSummaryJobById(user.id, id);
  }

  @Mutation(() => String)
  async deleteSummaryJobById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryJobService.deleteSummaryJobById(user.id, id);
  }
}
