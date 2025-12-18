import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubscriptions1765981588264 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "subscriptions" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INTEGER NOT NULL,
                "plan_id" INTEGER NOT NULL,
                "start_date" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "end_date" TIMESTAMPTZ NULL,
                "status" "subscription_status" NOT NULL DEFAULT 'PENDING',
                CONSTRAINT "fk_sub_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "fk_sub_plan" FOREIGN KEY ("plan_id") REFERENCES "subscription_plans"("id") ON DELETE RESTRICT
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "subscriptions"`);
  }
}
