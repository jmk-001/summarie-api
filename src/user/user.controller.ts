import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../common/decorators/get-user.decorator';
import { UpdateUserInput } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return userId;
  }

  @Patch()
  updateUser(@GetUser('id') userId: string, @Body() dto: UpdateUserInput) {
    return this.userService.updateUser(userId, dto);
  }
}
