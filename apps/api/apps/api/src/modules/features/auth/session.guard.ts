// apps/api/src/modules/auth/session.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const sessionId = req.cookies['SESSIONID'];
    if (!sessionId) return false;

    const userId = await this.authService.validateSession(sessionId as string);
    if (!userId) return false;

    req.userId = userId;
    return true;
  }
}
