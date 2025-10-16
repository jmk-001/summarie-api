import { GraphqlConfig } from './common/configs/config.interface';
import { ConfigService } from '@nestjs/config';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { Context } from 'graphql-ws';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  constructor(private configService: ConfigService) {}
  createGqlOptions(): ApolloDriverConfig {
    const graphqlConfig = this.configService.get<GraphqlConfig>('graphql');
    return {
      // schema options
      autoSchemaFile: graphqlConfig.schemaDestination || './src/schema.graphql',
      sortSchema: graphqlConfig.sortSchema,
      buildSchemaOptions: {
        numberScalarMode: 'integer',
      },
      // subscription
      includeStacktraceInErrorResponses: graphqlConfig.debug,
      playground: graphqlConfig.playgroundEnabled,
      subscriptions: {
        'graphql-ws': {
          onConnect: (ctx: Context) => {
            const raw =
              (ctx.connectionParams as any)?.authorization ??
              (ctx.connectionParams as any)?.Authorization;

            if (typeof raw === 'string' && raw) {
              const authorization = raw.startsWith('Bearer ')
                ? raw
                : `Bearer ${raw}`;
              const extra = ctx.extra as { request: any };
              const req = extra.request;
              req.headers = { ...req.headers, authorization };
            }
          },
        },
      },

      context: ({ req, extra }) => {
        return { req: req ?? extra?.request };
      },
    };
  }
}
