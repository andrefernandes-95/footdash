import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from './email-verification.entity';
import { User } from 'apps/api/src/modules/features/users/user.entity';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { ApiConfig } from 'apps/api/src/modules/data/config';
import { EmailQueueService } from 'apps/api/src/modules/email-queue/email-queue.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly verificationRepo: Repository<EmailVerification>,
    private readonly mailerService: MailerService,
    private readonly emailQueueService: EmailQueueService
  ) {}

  async generateToken(user: User, transactionManager: EntityManager, expiresInHours = 24) {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    const verification = transactionManager.create(EmailVerification, {
      user,
      token,
      expiresAt,
    });

    await transactionManager.save(verification);
    return verification;
  }

  async enqueueEmailVerification(email: string, token: string) {
    console.log('add to queue')
    await this.emailQueueService.addVerificationEmailToQueue(email, token);
  }

  async sendVerificationEmail(to: string, token: string) {
    const url = `${ApiConfig.CLIENT_URI}/verify-email?token=${token}`;

    try {

    const result = await this.mailerService.sendMail({
      to,
      subject: 'Verify your FootDash account',
      html: `
        <h2>Welcome to FootDash!</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${url}">Verify Email</a>
        <p>If you did not sign up, you can ignore this email.</p>
      `,
    });
        console.info(`Email Result: `, JSON.stringify(result))

    } catch (e) {
      console.log('error', e)
    }
    
  }

  async verifyToken(token: string) {
    const verification = await this.verificationRepo.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!verification) return null;
    if (verification.verified) return verification;
    if (verification.expiresAt && verification.expiresAt < new Date()) return null;

    verification.verified = true;
    await this.verificationRepo.save(verification);
    return verification;
  }
}
