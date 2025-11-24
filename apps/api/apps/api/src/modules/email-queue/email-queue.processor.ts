import { Processor, Process } from '@nestjs/bull';
import { EmailVerificationService } from 'apps/api/src/modules/features/email-verification/email-verification.service';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  constructor(private readonly mailService: EmailVerificationService) { }

  @Process('sendVerification')
  async handleSendVerification(job: Job<{ to: string; token: string }>) {
    try {
      await this.mailService.sendVerificationEmail(job.data.to, job.data.token);
    } catch (error) {
      console.error(`Failed to send email to ${job.data.to}:`, error);
      // Throw error to let BullMQ retry automatically
      throw error;
    }
  }
}
