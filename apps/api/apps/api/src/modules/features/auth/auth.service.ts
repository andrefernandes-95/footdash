// apps/api/src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { SessionService } from 'apps/api/src/modules/features/auth/session.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) { }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.validateLogin(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account inactive. Please verify your email.');
    }

    return this.sessionService.createSession(user.id);
  }

  async validateSession(sessionId: string): Promise<number | null> {
    return this.sessionService.getUserId(sessionId);
  }

  async logout(sessionId: string) {
    await this.sessionService.deleteSession(sessionId);
  }

  async getUserIdFromSession(sessionId: string): Promise<number | null> {
    return this.sessionService.getUserId(sessionId);
  }

  async getUserById(userId: number) {
    return this.userService.getUserById(userId)
  }
}
