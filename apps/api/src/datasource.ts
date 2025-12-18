import 'dotenv/config'; // automatically loads .env
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: false,
  migrationsRun: false,
  dropSchema: false,
  logging: true,
  migrations: [__dirname + '/modules/migrations/**/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
});

export default dataSource;
