import { forwardRef, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailModule } from '../mail/mail.module';
import { RedisConfig } from 'src/modules/redis/redis.module';
import { EmailProcessor } from 'src/modules/email-queue/email-queue.processor';
import { EmailQueueService } from 'src/modules/email-queue/email-queue.service';
import { EmailVerificationModule } from 'src/modules/features/email-verification/email-verification.module';

@Module({
  imports: [
    forwardRef(() => EmailVerificationModule),
    BullModule.registerQueue({
      name: 'email',
      redis: {
        host: RedisConfig.host,
        port: RedisConfig.port,
      },
    }),
    MailModule,
  ],
  providers: [EmailQueueService, EmailProcessor],
  exports: [EmailQueueService],
})
export class EmailQueueModule {}
