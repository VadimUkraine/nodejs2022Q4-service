import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';

dotenv.config();

export const typeormConfig = {
  type: 'postgres',
  host: env.POSTGRES_HOST as string,
  port: parseInt(env.POSTGRES_PORT as string) as number,
  username: env.POSTGRES_USER as string,
  password: env.POSTGRES_PASSWORD as string,
  database: env.POSTGRES_DB as string,
  entities: [User],
  synchronize: true,
  logging: true,
  migrations: [],
} as DataSourceOptions;
