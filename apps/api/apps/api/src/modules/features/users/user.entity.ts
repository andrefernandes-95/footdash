import { Subscription } from "apps/api/src/modules/features/subscriptions/subscription.entity";
import { TeamMember } from "apps/api/src/modules/features/teams/team-member.entity";
import { UserProfile } from "apps/api/src/modules/features/users/user-profile.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true, name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'timestamptz', name: 'last_login_at', default: null })
  lastLoginAt: Date;

  @Column({ type: 'timestamptz', name: 'created_at', default: () => 'NOW()' })
  createdAt: Date;

  @OneToMany(() => TeamMember, (member) => member.user)
  teamMembers: TeamMember[];

  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[];

  @OneToOne(() => UserProfile, (profile) => profile.user, { cascade: true })
  profile: UserProfile;

}
