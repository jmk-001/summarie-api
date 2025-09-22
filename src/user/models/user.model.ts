import {
  Field,
  GraphQLISODateTime,
  HideField,
  ID,
  ObjectType,
} from '@nestjs/graphql';
import { Document } from '../../document/models/document.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => String)
  email: string;

  @HideField()
  passwordHash: string;

  @Field(() => [Document], { nullable: 'itemsAndList' })
  documents?: (Document | null)[] | null;
}
