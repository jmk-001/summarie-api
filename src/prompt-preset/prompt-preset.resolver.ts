import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { PromptPresetService } from './prompt-preset.service';
import { PromptPreset } from './models/prompt-preset.model';
import { CreatePromptPresetInput, UpdatePromptPresetInput } from './dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Resolver()
@UseGuards(GqlAuthGuard)
export class PromptPresetResolver {
  constructor(private promptPresetService: PromptPresetService) {}

  @Mutation(() => PromptPreset)
  async createPromptPreset(
    @CurrentUser() user: { id: string },
    @Args('data') data: CreatePromptPresetInput,
  ) {
    return this.promptPresetService.createPromptPreset(user.id, data);
  }

  @Query(() => [PromptPreset], { name: 'promptPresets' })
  async getPromptPresets(@CurrentUser() user: { id: string }) {
    return this.promptPresetService.getPromptPresets(user.id);
  }

  @Query(() => PromptPreset, { name: 'promptPreset' })
  async getPromptPresetById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.promptPresetService.getPromptPresetById(user.id, id);
  }

  @Mutation(() => PromptPreset)
  async updatePromptPreset(
    @CurrentUser() user: { id: string },
    @Args('data') data: UpdatePromptPresetInput,
  ) {
    return this.promptPresetService.updatePromptPreset(user.id, data);
  }

  @Mutation(() => ID)
  async deletePromptPresetById(
    @CurrentUser() user: { id: string },
    @Args('id') id: string,
  ) {
    return this.promptPresetService.deletePromptPresetById(user.id, id);
  }
}
