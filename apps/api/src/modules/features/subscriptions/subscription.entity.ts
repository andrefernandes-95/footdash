import { SubscriptionPlan } from 'src/modules/features/subscription-plans/subscription-plan.entity';
import { SubscriptionStatus } from 'src/modules/features/subscriptions/subscription.enum';
import { User } from 'src/modules/features/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.subscriptions, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => SubscriptionPlan, (plan) => plan.subscriptions)
  plan: SubscriptionPlan;

  @CreateDateColumn({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'timestamptz', nullable: true })
  endDate: Date | null;

  @Column({
    type: 'enum', // tells TypeORM this is an enum column
    enum: SubscriptionStatus, // the enum type
    default: SubscriptionStatus.PENDING,
  })
  status: SubscriptionStatus;
}
