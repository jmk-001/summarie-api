import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
  IsEnum,
  IsInt,
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

@InputType('UpdatePromptPresetInput')
export class UpdatePromptPresetInput {
  @Field(() => ID)
  @IsString()
  id: string;

  @Field(() => String)
  @IsString()
  @IsOptional()
  name?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string | null;

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @IsOptional()
  schemaVersion?: number;

  @Field(() => GraphQLJSONScalar)
  @IsOptional()
  params?: Prisma.JsonValue;

  @Field(() => PromptVisibility)
  @IsEnum(PromptVisibility)
  @IsOptional()
  visibility?: PromptVisibility;
}
