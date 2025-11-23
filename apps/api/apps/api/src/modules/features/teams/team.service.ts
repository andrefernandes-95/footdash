import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
import { CreateUserDto } from '../users/user.dto';
import * as bcrypt from 'bcryptjs';
import { CreateTeamDto } from 'apps/api/src/modules/features/teams/team.dto';
import { TeamMembershipStatus, TeamRole } from 'apps/api/src/modules/features/teams/team.enum';

@Injectable()
export class TeamsService {
    constructor(private dataSource: DataSource) { }

    async createUserWithTeam(
        userDto: CreateUserDto,
        teamDto: CreateTeamDto,
    ): Promise<{ user: User; team: Team }> {
        return this.dataSource.transaction(async (transactionManager) => {
            // 1. Create the user
            const hashedPassword = await bcrypt.hash(userDto.password, 10);
            const user = transactionManager.create(User, {
                username: userDto.username,
                email: userDto.email,
                password: hashedPassword,
                isActive: true,
            });
            await transactionManager.save(user);

            // 2. Create the team
            const slug = teamDto.slug
                ? teamDto.slug.toLowerCase()
                : teamDto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const team = transactionManager.create(Team, {
                name: teamDto.name,
                slug,
            });

            await transactionManager.save(team);

            // 3. Link user as admin in team_members
            const member = transactionManager.create(TeamMember, {
                user,
                team,
                teamRole: TeamRole.ADMIN,
                status: TeamMembershipStatus.ACTIVE,
            });
            await transactionManager.save(member);

            return { user, team };
        });
    }
}
