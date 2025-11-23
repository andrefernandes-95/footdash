// teams/teams.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TeamsService } from 'apps/api/src/modules/features/teams/team.service';
import { CreateTeamWithUserDto } from 'apps/api/src/modules/features/teams/team.dto';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user and team (user becomes admin)' })
  @ApiResponse({
    status: 201,
    description: 'User and team created successfully',
    schema: {
      example: {
        userId: 1,
        teamId: 1,
        teamSlug: 'fc-porto',
      },
    },
  })
  async create(@Body() body: CreateTeamWithUserDto): Promise<{ userId: number; teamId: number; teamSlug: string }> {
    const { user, team } = await this.teamsService.createUserWithTeam(body.user, body.team);
    return {
      userId: user.id,
      teamId: team.id,
      teamSlug: team.slug,
    };
  }
}
