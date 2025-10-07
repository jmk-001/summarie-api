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
  async createForUser(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreateSummaryResultInput,
  ) {
    return this.summaryResultService.createForUser(user.id, data);
  }

  @Query(() => [SummaryResult], { name: 'summaryResults' })
  async findManyForUser(@CurrentUser() user: { id: string }) {
    return this.summaryResultService.findManyForUser(user.id);
  }

  @Query(() => SummaryResult, { name: 'summaryResult' })
  async findForUser(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryResultService.findForUser(user.id, id);
  }

  @Mutation(() => String)
  async deleteForUser(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.summaryResultService.deleteForUser(user.id, id);
  }
}
