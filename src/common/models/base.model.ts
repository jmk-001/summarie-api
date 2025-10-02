import { Field, ObjectType, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export abstract class BaseModel {
  @Field(() => ID)
  id: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;
}
