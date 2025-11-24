import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailVerification } from './email-verification.entity';
import { User } from 'apps/api/src/modules/features/users/user.entity';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import { getClientUri } from 'apps/api/src/modules/data/config';
import { EmailQueueService } from 'apps/api/src/modules/email-queue/email-queue.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly verificationRepo: Repository<EmailVerification>,
    private readonly mailerService: MailerService,
    private readonly emailQueueService: EmailQueueService,
    private readonly dataSource: DataSource,
  ) { }

  async generateToken(user: User, transactionManager: EntityManager, expiresInHours = 24) {
    const token = randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    const verification = transactionManager.create(EmailVerification, {
      userId: user.id,
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
    const url = `${getClientUri()}/verify-email?token=${token}`;

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

  async verifyTokenAndActivateUser(token: string) {
    return this.dataSource.transaction(async (manager) => {
      const verificationRepo = manager.getRepository(EmailVerification);
      const userRepo = manager.getRepository(User);

      // 1. Lock ONLY the email_verification row (no relations)
      const verification = await verificationRepo.findOne({
        where: { token },
        lock: { mode: 'pessimistic_write' },
      });

      if (!verification) {
        return null;
      }

      if (verification.verified) {
        // Load user separately if needed
        const user = await userRepo.findOne({ where: { id: verification.userId } });
        return { user };
      }

      if (verification.expiresAt < new Date()) {
        return null;
      }

      console.log(verification)
      
      // 2. Load the user manually (this is safe)
      const user = await userRepo.findOne({ where: { id: verification.userId } });
      
      if (!user) {
        return null; // Shouldn't happen but safe check}
      }
      
      // 3. Mark token verified
      verification.verified = true;
      await verificationRepo.save(verification);

      // 4. Activate user
      user.isActive = true;
      await userRepo.save(user);

      return { user };
    });
  }

}
