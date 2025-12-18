import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptionPlans1765981551558
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "subscription_plans" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL UNIQUE,
                "description" TEXT NULL,
                "price" NUMERIC(10,2) NOT NULL DEFAULT 0,
                "duration_months" INTEGER NOT NULL DEFAULT 1,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
            )
        `);

    await queryRunner.query(`
            CREATE TYPE "subscription_status" AS ENUM ('PENDING', 'ACTIVE', 'CANCELLED', 'EXPIRED')
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "subscription_status"`);
    await queryRunner.query(`DROP TABLE "subscription_plans"`);
  }
}
