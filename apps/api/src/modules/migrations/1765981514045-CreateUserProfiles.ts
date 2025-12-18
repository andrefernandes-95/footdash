import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserProfiles1765981514045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "user_profiles" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INTEGER NOT NULL UNIQUE,
                "first_name" VARCHAR(255) NULL,
                "last_name" VARCHAR(255) NULL,
                "phone" VARCHAR(50) NULL,
                "date_of_birth" DATE NULL,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "updated_at" TIMESTAMPTZ DEFAULT now(),
                CONSTRAINT "fk_user_profile_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_profiles"`);
  }
}
