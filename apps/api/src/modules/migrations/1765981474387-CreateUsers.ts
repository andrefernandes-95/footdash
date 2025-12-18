import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsers1765981474387 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create user_role enum
    await queryRunner.query(`
            CREATE TYPE "user_role" AS ENUM ('FAN', 'PLAYER', 'COACH', 'ADMIN')
        `);

    // Create users table
    await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) NOT NULL UNIQUE,
                "email" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "is_active" BOOLEAN NOT NULL DEFAULT FALSE,
                "role" "user_role" NOT NULL DEFAULT 'FAN',
                "last_login_at" TIMESTAMPTZ NULL,
                "created_at" TIMESTAMPTZ DEFAULT NOW()
            )
        `);

    // Index on email
    await queryRunner.query(`
            CREATE INDEX "idx_users_email" ON "users"("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_users_email"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "user_role"`);
  }
}
