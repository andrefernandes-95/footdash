import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { randomBytes } from 'crypto';

@Injectable()
export class SessionService {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) {}

  async createSession(userId: number, ttl = 3600): Promise<string> {
    const sessionId = randomBytes(32).toString('hex');
    await this.redisClient.set(`session:${sessionId}`, userId.toString(), 'EX', ttl);
    return sessionId;
  }

  async getUserId(sessionId: string): Promise<number | null> {
    const userId = await this.redisClient.get(`session:${sessionId}`);
    return userId ? parseInt(userId, 10) : null;
  }

  async deleteSession(sessionId: string) {
    await this.redisClient.del(`session:${sessionId}`);
  }
}
