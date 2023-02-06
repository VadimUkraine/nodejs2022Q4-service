import { Injectable } from '@nestjs/common';
import { UserInterface } from '../interfaces/user.interface';
import { UsersStore } from '../interfaces/user.store.interface';

@Injectable()
export class InMemoryUsersStore implements UsersStore {
  private readonly users: UserInterface[] = [];

  create = async (user: UserInterface): Promise<void> => {
    this.users.push(user);
  };

  findAll = async (): Promise<UserInterface[]> => {
    return this.users;
  };

  findOne = async (id: string): Promise<UserInterface | undefined> => {
    return this.users.find((user) => user.id === id);
  };

  update = async (id: string, user: UserInterface): Promise<void> => {
    const index = this.users.findIndex((user) => user.id === id);
    this.users[index] = user;
  };

  remove = async (id: string): Promise<void> => {
    const index = this.users.findIndex((user) => user.id === id);
    this.users.splice(index, 1);
  };
}
