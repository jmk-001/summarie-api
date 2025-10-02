import { registerEnumType } from '@nestjs/graphql';

export enum PromptVisibility {
  private = 'private',
  organization = 'organization',
  public = 'public',
}
registerEnumType(PromptVisibility, { name: 'PromptVisibility' });
