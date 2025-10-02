import { GraphQLJSON } from 'graphql-type-json';
import { GraphQLScalarType } from 'graphql';

export const GraphQLJSONScalar: GraphQLScalarType<unknown, unknown> =
  GraphQLJSON;
