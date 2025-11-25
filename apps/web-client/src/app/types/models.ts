export interface Team {
    id: number;

    name: string;

    slug: string;

    createdAt: Date;

    createdBy: number;

    members: TeamMember[];

    color: string;
}

export interface TeamMember {
    id: number;
    userId: number;

    team: Team;

    user: User;

    teamRole: TeamRole;

    status: TeamMembershipStatus;

    canAccessBackoffice: boolean;

}

export enum TeamMembershipStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  REVOKED = 'REVOKED',
}

export enum TeamRole {
    FAN = 'FAN',
    PLAYER = 'PLAYER',
    COACH = 'COACH',
    ADMIN = 'ADMIN',
}

export interface User {
  id: number;

  username: string;

  email: string;

  password: string;

  isActive: boolean;

  lastLoginAt: Date;

  createdAt: Date;

  teamMembers: TeamMember[];

  /*
  subscriptions: Subscription[];

  profile: UserProfile;*/

}
