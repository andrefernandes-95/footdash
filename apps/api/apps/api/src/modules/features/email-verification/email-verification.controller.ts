import { Controller, Get, Query, NotFoundException } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';

@Controller('email-verification')
export class EmailVerificationController {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get('verify')
  async verify(@Query('token') token: string) {
    if (!token) throw new NotFoundException('Token is required');

    const result = await this.emailVerificationService.verifyTokenAndActivateUser(token);

    if (!result) throw new NotFoundException('Invalid or expired token');

    return { message: 'Email verified successfully', user: result.user };
  }
}
