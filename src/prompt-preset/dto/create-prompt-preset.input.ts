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
import {
  GraphQLJSONScalar,
  PromptVisibility,
} from '../models/prompt-preset.model';
import { Prisma } from '@prisma/client';

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
