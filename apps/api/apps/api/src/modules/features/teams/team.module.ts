import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Team } from './team.entity';
import { TeamMember } from './team-member.entity';
import { TeamsService } from 'apps/api/src/modules/features/teams/team.service';
import { TeamController } from 'apps/api/src/modules/features/teams/team.controller';
import { AuthModule } from 'apps/api/src/modules/features/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([User, Team, TeamMember]),
  ],
  providers: [TeamsService],
  controllers: [TeamController],
  exports: [TeamsService],
})
export class TeamsModule {}
