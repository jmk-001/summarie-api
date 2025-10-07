import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType('CreateSummaryResultInput')
export class CreateSummaryResultInput {
  @Field(() => String)
  @IsString()
  jobId: string;

  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => Int)
  @IsInt()
  tokensUsed: number;

  @Field(() => String)
  @IsString()
  model: string;
}
