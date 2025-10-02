import { Module } from '@nestjs/common';
import { PromptPresetResolver } from './prompt-preset.resolver';
import { PromptPresetService } from './prompt-preset.service';

@Module({
  providers: [PromptPresetResolver, PromptPresetService],
})
export class PromptPresetModule {}
