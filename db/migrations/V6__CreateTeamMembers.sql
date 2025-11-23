-- A user can belong to one or many teams --
CREATE TABLE team_members(
    id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    team_role VARCHAR(50) NOT NULL DEFAULT 'USER',

    CONSTRAINT fk_team
        FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE,
    
    UNIQUE(team_id, user_id)
);
