// apps/api/src/modules/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { SessionService } from 'apps/api/src/modules/features/auth/session.service';
import { DataSource } from 'typeorm';
import { TeamMember } from 'apps/api/src/modules/features/teams/team-member.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly dataSource: DataSource,
  ) { }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.validateLogin(email, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.isActive) {
      throw new Error('Account inactive. Please verify your email.');
    }

    return this.sessionService.createSession(user.id);
  }

  async validateSession(sessionId: string): Promise<number | null> {
    return this.sessionService.getUserId(sessionId);
  }

  async logout(sessionId: string) {
    await this.sessionService.deleteSession(sessionId);
  }

  async getUserIdFromSession(sessionId: string): Promise<number | null> {
    return this.sessionService.getUserId(sessionId);
  }

  async getTeamMembership(userId: number, teamSlug: string) {
    const repo = this.dataSource.getRepository(TeamMember);
    return repo.findOne({
      where: { userId, team: { slug: teamSlug } },
      relations: ['team'], // include team info
    });
  }

  async getUserById(userId: number) {
    return this.userService.getUserById(userId)
  }
}
