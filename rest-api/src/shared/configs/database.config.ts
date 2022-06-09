import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  DB_AUTOLOADMODELS,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNCHRONIZE,
  DB_USERNAME,
} from './environment.config';

export const databaseConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: DB_SYNCHRONIZE,
    autoLoadEntities: DB_AUTOLOADMODELS,
    logging: true,
    entities: ['dist/**/*.entity{ .ts,.js}'],
  };
};
