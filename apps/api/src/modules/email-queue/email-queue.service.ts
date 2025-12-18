import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('email') private readonly emailQueue: Queue) {}

  async addVerificationEmailToQueue(to: string, token: string) {
    await this.emailQueue.add('sendVerification', { to, token });
  }
}
