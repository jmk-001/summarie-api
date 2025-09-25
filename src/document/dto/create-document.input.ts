import { Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  title: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  content: string;

  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  @IsString()
  sourceType: string;

  @Field(() => String, { nullable: true })
  @IsString()
  sourceUrl?: string | null;
}
