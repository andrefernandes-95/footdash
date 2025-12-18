// apps/api/src/modules/auth/guards/session.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/modules/features/auth/auth.service';
import { SessionService } from 'src/modules/features/auth/session.service';
import { CookieOptions, Request, Response } from 'express';

export const sessionIdConfig: CookieOptions = {
  httpOnly: true,
  maxAge: 3600 * 1000, // 1 hour
  sameSite: 'none',
};

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    const sessionId = req.cookies?.['SESSIONID'];

    if (!sessionId) {
      return false; // no session, not authenticated
    }

    // Get userId from Redis/session store
    const userId = await this.authService.getUserIdFromSession(sessionId);
    if (!userId) {
      return false; // invalid session
    }

    // ✅ Sliding expiration: refresh cookie and backend session
    res.cookie('SESSIONID', sessionId, sessionIdConfig);

    await this.sessionService.refreshSessionTTL(sessionId); // reset TTL in Redis

    // Attach userId to request for controllers
    (req as any).userId = userId;

    return true; // allow access
  }
}
