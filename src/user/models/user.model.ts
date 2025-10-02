import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Document } from '../../document/models/document.model';
import { BaseModel } from '../../common/models/base.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String)
  email: string;

  @HideField()
  passwordHash: string;

  @Field(() => [Document], { nullable: 'itemsAndList' })
  documents?: (Document | null)[] | null;
}
