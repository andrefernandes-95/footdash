import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailVerification } from './email-verification.entity';
import { EmailVerificationService } from './email-verification.service';
import { MailModule } from 'src/modules/mail/mail.module';
import { EmailQueueModule } from 'src/modules/email-queue/email-queue.module';
import { EmailVerificationController } from 'src/modules/features/email-verification/email-verification.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmailVerification]),
    EmailQueueModule,
    MailModule,
  ],
  controllers: [EmailVerificationController],
  providers: [EmailVerificationService],
  exports: [EmailVerificationService],
})
export class EmailVerificationModule {}
