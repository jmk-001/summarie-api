import { Field, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Prisma } from '@prisma/client';
import { GraphQLJSONScalar } from '../../common/types';
import { PromptVisibility } from '../models/prompt-visibility.enum';

@InputType('CreatePromptPresetInput')
export class CreatePromptPresetInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  schemaVersion: number;

  @Field(() => GraphQLJSONScalar)
  params: Prisma.JsonValue;

  @Field(() => PromptVisibility)
  @IsEnum(PromptVisibility)
  visibility: PromptVisibility;
}
