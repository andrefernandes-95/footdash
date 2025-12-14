// teams/teams.controller.ts
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CurrentUserId } from 'apps/api/src/modules/features/auth/current-user.decorator';
import { SessionGuard } from 'apps/api/src/modules/features/auth/session.guard';
import { CreateTeamDto } from 'apps/api/src/modules/features/teams/team.dto';
import { Team } from 'apps/api/src/modules/features/teams/team.entity';
import { TeamsService } from 'apps/api/src/modules/features/teams/team.service';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(
    private readonly teamsService: TeamsService
  ) { }

  
  @UseGuards(SessionGuard)
  @Get('my-teams')
  @ApiOperation({ summary: 'Get teams created by the logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'List of teams created by the user',
    schema: {
      example: [
        { id: 1, name: 'FC Porto', slug: 'fc-porto', createdBy: 2 },
        { id: 2, name: 'Real Madrid', slug: 'real-madrid', createdBy: 2 },
      ],
    },
  })
  async getMyTeams(@CurrentUserId() userId: number): Promise<Team[]> {
    return this.teamsService.getTeamsCreatedByUser(userId);
  }
  @Get(':slug')
  @ApiOperation({ summary: 'Get a team by its slug (public)' })
  @ApiResponse({
    status: 200,
    description: 'Team data',
    schema: {
      example: {
        id: 10,
        name: 'My Team',
        slug: 'my-team',
        createdBy: 1,
      },
    },
  })
  async getTeamBySlug(@Param('slug') slug: string): Promise<Team> {
    return this.teamsService.getTeamBySlug(slug);
  }

  @UseGuards(SessionGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a team for the logged-in user' })
  @ApiResponse({
    status: 201,
    description: 'Team created successfully',
    schema: {
      example: {
        userId: 1,
        teamId: 10,
        teamSlug: 'my-team',
      },
    },
  })
  async create(
    @CurrentUserId() userId: number,
    @Body() body: CreateTeamDto
  ): Promise<{ userId: number; teamId: number; teamSlug: string }> {
    const { team } = await this.teamsService.createTeam(userId, body);

    return {
      userId,
      teamId: team.id,
      teamSlug: team.slug,
    };
  }
}
