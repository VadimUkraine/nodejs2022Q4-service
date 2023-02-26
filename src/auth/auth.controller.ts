import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { constants as httpStatus } from 'node:http2';
import { RefreshTokenDto } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createAuthData: CreateUserDto) {
    return this.authService.signup(createAuthData);
  }

  @Post('login')
  @HttpCode(httpStatus.HTTP_STATUS_OK)
  create(@Body() loginAuthData: CreateUserDto) {
    return this.authService.login(loginAuthData);
  }

  @Post('refresh')
  @HttpCode(httpStatus.HTTP_STATUS_OK)
  async refresh(@Body() tokenData: RefreshTokenDto) {
    return await this.authService.refresh(tokenData);
  }
}
