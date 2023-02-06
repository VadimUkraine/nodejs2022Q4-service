import { UserInterface } from './user.interface';

export interface UsersStore {
  create(user: UserInterface): Promise<void>;

  findAll(): Promise<UserInterface[]>;

  findOne(id: string): Promise<UserInterface | undefined>;

  update(id: string, user: UserInterface): Promise<void>;

  remove(id: string): Promise<void>;
}
