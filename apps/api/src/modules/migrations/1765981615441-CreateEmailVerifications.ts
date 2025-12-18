import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmailVerifications1765981615441
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "email_verifications" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INTEGER NOT NULL,
                "token" VARCHAR(255) NOT NULL UNIQUE,
                "verified" BOOLEAN DEFAULT FALSE,
                "created_at" TIMESTAMPTZ DEFAULT now(),
                "expires_at" TIMESTAMPTZ NULL,
                CONSTRAINT "fk_email_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "email_verifications"`);
  }
}
