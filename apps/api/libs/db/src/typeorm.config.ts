import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function createTypeOrmConfig(entitiesPath: never[]): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

    // each app will pass its own entity paths
    entities: entitiesPath,

    // Do NOT allow TypeORM to touch the schema
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,

    logging: true,
  };
}
