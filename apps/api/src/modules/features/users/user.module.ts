// apps/api/src/modules/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { EmailVerificationModule } from 'src/modules/features/email-verification/email-verification.module';
import { Subscription } from 'src/modules/features/subscriptions/subscription.entity';
import { SubscriptionPlan } from 'src/modules/features/subscription-plans/subscription-plan.entity';
import { UserProfile } from 'src/modules/features/users/user-profile.entity';

@Module({
  imports: [
    EmailVerificationModule,
    TypeOrmModule.forFeature([
      User,
      UserProfile,
      Subscription,
      SubscriptionPlan,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
