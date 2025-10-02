import { Field, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSONScalar } from '../../common/types';
import { Prisma } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

@InputType('CreateSummaryJobInput')
export class CreateSummaryJobInput {
  @Field(() => String)
  @IsNotEmpty()
  documentId: string;

  @Field(() => String)
  @IsNotEmpty()
  model: string;

  @Field(() => String, { nullable: true })
  idempotencyKey?: string | null;

  @Field(() => Int)
  schemaVersion: number;

  @Field(() => GraphQLJSONScalar)
  paramsSnapshot: Prisma.JsonValue;
}
