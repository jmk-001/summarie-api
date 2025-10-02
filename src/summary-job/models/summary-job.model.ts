import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';
import { GraphQLJSONScalar } from '../../common/types';
import { Prisma } from '@prisma/client';
import { SummaryJobStatus } from './summary-job-status.enum';

@ObjectType()
export class SummaryJob extends BaseModel {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  documentId: string;

  @Field(() => String)
  model: string;

  @Field(() => GraphQLISODateTime, { nullable: true })
  startedAt?: Date | null;

  @Field(() => GraphQLISODateTime, { nullable: true })
  finishedAt?: Date | null;

  @Field(() => SummaryJobStatus)
  status: SummaryJobStatus;

  @Field(() => String, { nullable: true })
  error?: string | null;

  @Field(() => Int)
  attempts: number;

  @Field(() => String, { nullable: true })
  idempotencyKey?: string | null;

  @Field(() => Int)
  schemaVersion: number;

  @Field(() => GraphQLJSONScalar)
  paramsSnapshot: Prisma.JsonValue;
}
