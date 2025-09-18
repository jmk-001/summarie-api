import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserResolver, UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
