import { Field, Int } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

export class LlmOutputDto {
  @Field(() => String)
  @IsString()
  content: string;

  @Field(() => Int)
  @IsInt()
  tokensUsed: number;
}
