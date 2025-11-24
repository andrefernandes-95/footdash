import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Team } from './team.entity';
import { User } from 'apps/api/src/modules/features/users/user.entity';
import { TeamMembershipStatus, TeamRole } from 'apps/api/src/modules/features/teams/team.enum';

@Entity('team_members')
@Unique(['team', 'user'])
export class TeamMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.members, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @ManyToOne(() => User, (user) => user.teamMembers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'team_role',
    type: 'enum',
    enum: TeamRole,
    default: TeamRole.PLAYER,
  })
  teamRole: TeamRole;

  @Column({
    type: 'enum',
    enum: TeamMembershipStatus,
    default: TeamMembershipStatus.PENDING,
  })
  status: TeamMembershipStatus;

  @Column({ name: 'can_access_backoffice' })
  canAccessBackoffice: boolean;

}
