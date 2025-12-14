// apps/api/src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SessionService } from './session.service';
import { UserModule } from '../users/user.module';
import { RedisModule } from 'apps/api/src/modules/redis/redis.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [RedisModule, UserModule, JwtModule.register({
  })],
  providers: [AuthService, SessionService, JwtService],
  controllers: [AuthController],
  exports: [AuthService, SessionService, JwtModule],
})
export class AuthModule { }
