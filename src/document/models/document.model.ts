import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class Document extends BaseModel {
  @Field(() => String)
  title: string;

  @Field(() => String)
  content: string;

  @Field(() => String)
  sourceType: string;

  @Field(() => String, { nullable: true })
  sourceUrl?: string | null;
}
