import { ApiModule } from '@api/api.module';
import { parseEnv } from '@config/parse-env.config';
import { ENV } from '@constants/env/env.constant';
import { DatabaseModule } from '@database/database.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: ENV.JWT_SECRET,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [parseEnv],
    }),
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    ApiModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
