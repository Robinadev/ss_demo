import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import * as Joi from 'joi';

import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ClassificationModule } from './modules/classification/classification.module';
import { CasesModule } from './modules/cases/cases.module';
import { ProfessionalsModule } from './modules/professionals/professionals.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ForumModule } from './modules/forum/forum.module';
import { SupportModule } from './modules/support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
        PORT: Joi.number().default(3001),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().default('24h'),
        FRONTEND_URL: Joi.string().default('http://localhost:3000'),
      }),
    }),

    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService): JwtModuleOptions => ({
        secret: configService.getOrThrow<string>('JWT_SECRET'),
        signOptions: {
          expiresIn:
            (configService.get<string>('JWT_EXPIRATION') ?? '24h') as NonNullable<
              NonNullable<JwtModuleOptions['signOptions']>['expiresIn']
            >,
        },
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),

    PrismaModule,
    AuthModule,
    ReportsModule,
    ClassificationModule,
    CasesModule,
    ProfessionalsModule,
    AnalyticsModule,
    ForumModule,
    SupportModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}