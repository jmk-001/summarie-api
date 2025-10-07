import { Field, GraphQLISODateTime, InputType, Int } from '@nestjs/graphql';
import { GraphQLJSONScalar } from '../../common/types';
import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';
import { SummaryJobStatus } from '../models/summary-job-status.enum';

@InputType('UpdateSummaryJobInput')
export class UpdateSummaryJobInput {
  @Field(() => String, { nullable: true })
  @IsOptional()
  documentId?: string | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  model?: string | null;

  @Field(() => GraphQLISODateTime)
  @IsOptional()
  startedAt?: Date | null;

  @Field(() => GraphQLISODateTime)
  @IsOptional()
  finishedAt?: Date | null;

  @Field(() => String, { nullable: true })
  @IsOptional()
  idempotencyKey?: string | null;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  schemaVersion?: number | null;

  @Field(() => GraphQLJSONScalar, { nullable: true })
  @IsOptional()
  paramsSnapshot?: Prisma.JsonValue | null;

  @Field(() => SummaryJobStatus, { nullable: true })
  @IsOptional()
  status?: SummaryJobStatus | null;
}
