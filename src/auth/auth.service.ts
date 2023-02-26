import { Injectable, Inject, forwardRef, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { userMessages, tokenMessages } from '../messages/error.messages';
import { constants as httpStatus } from 'http2';
import { env } from 'process';
import { compare } from 'bcrypt';
import { RefreshTokenDto } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async generateJWTTokens({ id, login }) {
    const accessToken = await this.jwtService.signAsync(
      { id, login },
      { expiresIn: env.TOKEN_EXPIRE_TIME },
    );

    const refreshToken = await this.jwtService.signAsync(
      { id, login },
      { expiresIn: env.TOKEN_REFRESH_EXPIRE_TIME },
    );

    return { accessToken, refreshToken };
  }

  async signup(createAuthDto: CreateUserDto) {
    return await this.userService.create(createAuthDto);
  }

  async login(loginAuthData: CreateUserDto) {
    const users = await this.usersRepository.findBy({
      login: loginAuthData.login,
    });
    const targetUser = users.find((user) =>
      compare(loginAuthData.password, user.password),
    );

    if (!targetUser) {
      throw new HttpException(
        userMessages.USER_NOT_FOUND,
        httpStatus.HTTP_STATUS_FORBIDDEN,
      );
    }

    return await this.generateJWTTokens(targetUser);
  }

  async refresh(tokenData: RefreshTokenDto) {
    const { refreshToken } = tokenData;

    if (!refreshToken || refreshToken.length === 0) {
      throw new HttpException(
        tokenMessages.NO_REFRESH_TOKEN,
        httpStatus.HTTP_STATUS_UNAUTHORIZED,
      );
    }

    try {
      const user = await this.jwtService.verifyAsync(tokenData.refreshToken);

      return await this.generateJWTTokens({ id: user.id, login: user.login });
    } catch {
      throw new HttpException(
        tokenMessages.REFRESH_TOKEN_IS_INVALID,
        httpStatus.HTTP_STATUS_FORBIDDEN,
      );
    }
  }
}
