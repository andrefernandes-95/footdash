CREATE TYPE team_role AS ENUM(
    'FAN',
    'PLAYER',
    'COACH',
    'ADMIN'
);

CREATE TYPE team_membership_status AS ENUM(
    'PENDING', 'ACTIVE', 'INACTIVE', 'REVOKED'
);

ALTER TABLE team_members ALTER COLUMN team_role DROP DEFAULT;

ALTER TABLE team_members 
    ALTER COLUMN team_role TYPE team_role USING team_role::team_role,
    ALTER COLUMN team_role SET DEFAULT 'FAN';

ALTER TABLE team_members
    ADD COLUMN status team_membership_status NOT NULL DEFAULT 'PENDING';