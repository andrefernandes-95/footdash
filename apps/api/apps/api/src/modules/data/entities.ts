import { User } from 'apps/api/src/modules/features/users/user.entity';
import { Team } from 'apps/api/src/modules/features/teams/team.entity';
import { TeamMember } from 'apps/api/src/modules/features/teams/team-member.entity';
import { Subscription } from 'apps/api/src/modules/features/subscriptions/subscription.entity';
import { SubscriptionPlan } from 'apps/api/src/modules/features/subscription-plans/subscription-plan.entity';
import { UserProfile } from 'apps/api/src/modules/features/users/user-profile.entity';

export const ALL_ENTITIES: never[] = [
    User,
    UserProfile,
    Team,
    TeamMember,
    Subscription,
    SubscriptionPlan
] as never[]
