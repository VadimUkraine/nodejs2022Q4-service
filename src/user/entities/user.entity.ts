import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { getTimestamp } from '../../helpers';

@Entity('user')
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column({ default: 1 })
  version: number;

  @Column({ default: getTimestamp() })
  createdAt: number;

  @Column({ default: getTimestamp() })
  updatedAt: number;

  @Column()
  password: string;
}
