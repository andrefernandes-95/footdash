import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../users/user.entity';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
import { CreateTeamDto } from './team.dto';
import { TeamMembershipStatus, TeamRole } from './team.enum';

@Injectable()
export class TeamsService {
    constructor(private dataSource: DataSource) { }

    async getTeamsCreatedByUser(userId: number): Promise<Team[]> {
        const teamRepo = this.dataSource.getRepository(Team);
        return teamRepo.find({
            where: { createdBy: userId },
            relations: ['members'], // optional, if you want to include members
        });
    }
    
    async createTeam(
        userId: number,
        teamDto: CreateTeamDto,
    ): Promise<{ team: Team }> {
        return this.dataSource.transaction(async (manager) => {
            const userRepo = manager.getRepository(User);
            const teamRepo = manager.getRepository(Team);
            const memberRepo = manager.getRepository(TeamMember);

            // 1. Validate user
            const user = await userRepo.findOne({ where: { id: userId } });
            if (!user) throw new NotFoundException('User not found');

            // 2. Create team
            const slug = teamDto.slug.toLowerCase();

            const team = teamRepo.create({ name: teamDto.name, slug, createdBy: user.id, color: teamDto.color });
            await teamRepo.save(team);

            // 3. Add user as admin
            const member = memberRepo.create({
                user,
                team,
                teamRole: TeamRole.ADMIN,
                status: TeamMembershipStatus.ACTIVE,
                canAccessBackoffice: true,
            });

            await memberRepo.save(member);

            return { team };
        });
    }
}
