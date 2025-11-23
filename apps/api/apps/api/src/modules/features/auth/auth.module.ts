// apps/api/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionService } from './session.service';
import { UserModule } from '../users/user.module';
import { RedisModule } from 'apps/api/src/modules/redis/redis.module';

@Module({
  imports: [RedisModule, UserModule],
  providers: [AuthService, SessionService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
