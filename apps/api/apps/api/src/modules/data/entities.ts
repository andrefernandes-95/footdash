import { User } from 'apps/api/src/modules/features/users/user.entity';
import { Subscription } from 'apps/api/src/modules/features/subscriptions/subscription.entity';
import { SubscriptionPlan } from 'apps/api/src/modules/features/subscription-plans/subscription-plan.entity';
import { UserProfile } from 'apps/api/src/modules/features/users/user-profile.entity';
import { EmailVerification } from 'apps/api/src/modules/features/email-verification/email-verification.entity';

export const ALL_ENTITIES: never[] = [
  User,
  UserProfile,
  Subscription,
  SubscriptionPlan,
  EmailVerification,
] as never[];
