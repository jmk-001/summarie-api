import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class SummaryResult extends BaseModel {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  jobId: string;

  @Field(() => String)
  content: string;

  @Field(() => Int)
  tokensUsed: number;

  @Field(() => String)
  model: string;
}
