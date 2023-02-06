import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryUsersStore } from './store/in-memory-users.store';
import { getTimestamp, getNormalizedUser } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { USER_VERSION_INCREMENT } from './user.constants';
import { userMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';

@Injectable()
export class UserService {
  constructor(private store: InMemoryUsersStore) {}

  async create(createUserDto: CreateUserDto) {
    const timestamp = getTimestamp();

    const user = {
      id: uuidv4(),
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
      ...createUserDto,
    };

    await this.store.create(user);

    const normalizedUser = getNormalizedUser(user);

    return normalizedUser;
  }

  async findAll() {
    const users = await this.store.findAll();
    const normalizedUsers = users.map((user) => getNormalizedUser(user));

    return normalizedUsers;
  }

  async findOne(id: string) {
    const user = await this.store.findOne(id);

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    const normalizedUser = getNormalizedUser(user);

    return normalizedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.store.findOne(id);

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException(
        userMessages.INVALID_PASSWORD,
        httpStatus.HTTP_STATUS_FORBIDDEN,
      );
    }

    user.password = updateUserDto.newPassword;
    user.version += USER_VERSION_INCREMENT;
    user.updatedAt = getTimestamp();

    await this.store.update(user.id, user);

    const normalizedUser = getNormalizedUser(user);

    return normalizedUser;
  }

  async remove(id: string) {
    const user = await this.store.findOne(id);

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.store.remove(user.id);
  }
}
