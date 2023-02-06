import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { InMemoryUsersStore } from './store/in-memory-users.store';

@Module({
  controllers: [UserController],
  providers: [UserService, InMemoryUsersStore],
})
export class UserModule {}
