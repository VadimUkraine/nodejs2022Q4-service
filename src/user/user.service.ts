import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { getTimestamp, getNormalizedUser } from '../helpers';
import { v4 as uuidv4 } from 'uuid';
import { USER_VERSION_INCREMENT } from './user.constants';
import { userMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { env } from 'process';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    const normalizedUsers = users.map((user) => getNormalizedUser(user));

    return normalizedUsers;
  }

  async findOne(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    const normalizedUser = getNormalizedUser(user);

    return normalizedUser;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.usersRepository.create({
      ...createUserDto,
      id: uuidv4(),
    });

    user.password = await hash(
      createUserDto.password,
      parseInt(env.CRYPT_SALT),
    );

    const normalizedUser = getNormalizedUser(
      await this.usersRepository.save(user),
    );

    return normalizedUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    const isPasswordsMatch = await compare(
      updateUserDto.oldPassword,
      user.password,
    );

    if (!isPasswordsMatch) {
      throw new HttpException(
        userMessages.INVALID_PASSWORD,
        httpStatus.HTTP_STATUS_FORBIDDEN,
      );
    }

    await this.usersRepository.update(id, {
      password: await hash(updateUserDto.newPassword, parseInt(env.CRYPT_SALT)),
      version: user.version + USER_VERSION_INCREMENT,
      updatedAt: getTimestamp(),
    });

    const normalizedUser = getNormalizedUser(
      await this.usersRepository.findOneBy({ id }),
    );

    return normalizedUser;
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_NOT_FOUND,
      );
    }

    await this.usersRepository.delete({ id });
  }
}
