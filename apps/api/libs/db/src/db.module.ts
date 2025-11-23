import { createTypeOrmConfig } from '@app/db/typeorm.config';
import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({})
export class DbModule {
  static forRoot(entitiesPath: never[]): DynamicModule {
    return {
      module: DbModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
          isGlobal: true,
        }),
        TypeOrmModule.forRoot(createTypeOrmConfig(entitiesPath))
      ]
    }
  }
}
