import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SummaryResult } from './models/summary-result.model';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreateSummaryResultInput } from './dto';
import { Query } from '@nestjs/graphql';
import { SummaryResultService } from './summary-result.service';

@Resolver()
export class SummaryResultResolver {
  constructor(private summaryResultService: SummaryResultService) {}

  @Mutation(() => SummaryResult)
  async createSummaryResult(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreateSummaryResultInput,
  ) {
    return this.summaryResultService.createSummaryResult(user.id, data);
  }

  @Query(() => [SummaryResult], { name: 'summaryResults' })
  async getSummaryResults(@CurrentUser() user: { id: string }) {
    return this.summaryResultService.getSummaryResults(user.id);
  }

  @Query(() => SummaryResult, { name: 'summaryResult' })
  async getSummaryResultById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryResultService.getSummaryResultById(user.id, id);
  }

  @Mutation(() => String)
  async deleteSummaryResult(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryResultService.deleteSummaryResult(user.id, id);
  }
}
