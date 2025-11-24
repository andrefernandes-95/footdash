ALTER TABLE teams
ADD COLUMN created_by INTEGER;

ALTER TABLE teams
ADD CONSTRAINT fk_teams_created_by
FOREIGN KEY (created_by)
REFERENCES users(id)
ON DELETE SET NULL;
