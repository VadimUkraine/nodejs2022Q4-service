import * as dotenv from 'dotenv';
import { env } from 'process';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './user/entities/user.entity';
import { Album } from './album/entities/album.entity';
import { Artist } from './artist/entities/artist.entity';
import { Track } from './track/entities/track.entity';
import { Favs } from './favs/entities/favs.entity';

dotenv.config();

export const typeormConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: parseInt(env.POSTGRES_PORT as string) as number,
  username: env.POSTGRES_USER as string,
  password: env.POSTGRES_PASSWORD as string,
  database: env.POSTGRES_DB as string,
  entities: [User, Album, Artist, Track, Favs],
  synchronize: false,
  logging: true,
  migrations: [__dirname + '/migrations/*.js'],
};

export const dataSource = new DataSource(typeormConfig);
