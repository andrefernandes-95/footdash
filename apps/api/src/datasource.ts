import 'dotenv/config'; // automatically loads .env
import { CreateUsers1765981474387 } from 'src/modules/migrations/1765981474387-CreateUsers';
import { CreateUserProfiles1765981514045 } from 'src/modules/migrations/1765981514045-CreateUserProfiles';
import { CreateSubscriptionPlans1765981551558 } from 'src/modules/migrations/1765981551558-CreateSubscriptionPlans';
import { CreateSubscriptions1765981588264 } from 'src/modules/migrations/1765981588264-CreateSubscriptions';
import { CreateEmailVerifications1765981615441 } from 'src/modules/migrations/1765981615441-CreateEmailVerifications';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: true,
  dropSchema: false,
  logging: true,
  migrations: [
    CreateUsers1765981474387,
    CreateUserProfiles1765981514045,
    CreateSubscriptionPlans1765981551558,
    CreateSubscriptions1765981588264,
    CreateEmailVerifications1765981615441,
  ],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});

export default dataSource;
