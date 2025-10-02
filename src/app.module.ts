import { Module } from '@nestjs/common';
import config from './common/configs/config';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './gql-config.service';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PromptPresetModule } from './prompt-preset/prompt-preset.module';
import { SummaryJobModule } from './summary-job/summary-job.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),

    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),

    AuthModule,
    UserModule,
    DocumentModule,
    PrismaModule,
    PromptPresetModule,
    SummaryJobModule,
  ],
})
export class AppModule {}
