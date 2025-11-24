import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './email-verification.entity';
import { EmailVerificationService } from './email-verification.service';
import { MailModule } from 'apps/api/src/modules/mail/mail.module';
import { EmailQueueModule } from 'apps/api/src/modules/email-queue/email-queue.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerification]),
    EmailQueueModule,
    MailModule,
  ],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
