import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DbModule } from '@app/db';
import { UserModule } from 'apps/api/src/modules/features/users/user.module';
import { AuthModule } from 'apps/api/src/modules/features/auth/auth.module';
import { TeamsModule } from 'apps/api/src/modules/features/teams/team.module';
import { ALL_ENTITIES } from 'apps/api/src/modules/data/entities';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    }),
    DbModule.forRoot(ALL_ENTITIES),
    UserModule,
    AuthModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
