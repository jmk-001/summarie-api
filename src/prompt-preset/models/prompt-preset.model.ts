import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { Prisma } from '@prisma/client';
import { GraphQLJSONScalar } from '../../common/types';
import { PromptVisibility } from './prompt-visibility.enum';

@ObjectType()
export class PromptPreset extends BaseModel {
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => String)
  ownerId: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  schemaVersion: number;

  @Field(() => GraphQLJSONScalar)
  params: Prisma.JsonValue;

  @Field(() => PromptVisibility)
  visibility: PromptVisibility;
}
