// libs/db/src/redis/redis.module.ts
import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';

export const RedisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT, 10) || 6379,
}

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        return new Redis({
          host: RedisConfig.host,
          port: RedisConfig.port,
        });
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
