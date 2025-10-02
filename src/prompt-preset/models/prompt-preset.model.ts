import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { GraphQLScalarType } from 'graphql';
import { GraphQLISODateTime } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { Prisma } from '@prisma/client';

export const GraphQLJSONScalar: GraphQLScalarType<unknown, unknown> =
  GraphQLJSON;

export enum PromptVisibility {
  private = 'private',
  organization = 'organization',
  public = 'public',
}
registerEnumType(PromptVisibility, { name: 'PromptVisibility' });

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
