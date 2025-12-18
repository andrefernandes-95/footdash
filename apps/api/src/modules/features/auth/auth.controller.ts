// apps/api/src/modules/auth/auth.controller.ts
import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/features/auth/auth.dto';
import { sessionIdConfig } from 'src/modules/features/auth/session.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Logged in successfully',
    schema: { example: { message: 'Logged in successfully' } },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const sessionId = await this.authService.login(body.email, body.password);

    // ✅ Sliding expiration: refresh cookie and backend session
    res.cookie('SESSIONID', sessionId, sessionIdConfig);

    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
    schema: { example: { message: 'Logged out' } },
  })
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const sessionId = req.cookies['SESSIONID'];
    if (sessionId) {
      await this.authService.logout(sessionId as string);
      res.clearCookie('SESSIONID');
    }
    return { message: 'Logged out' };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get currently logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'Current user info',
    schema: {
      example: {
        user: { id: 1, email: 'user@example.com', username: 'user1' },
      },
    },
  })
  async me(@Req() req: Request) {
    const sessionId = req.cookies?.['SESSIONID'];
    if (!sessionId) return { user: null };

    const userId = await this.authService.getUserIdFromSession(sessionId);
    if (!userId) return { user: null };

    const user = await this.authService.getUserById(userId);
    return { user };
  }
}
