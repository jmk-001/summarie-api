import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe() {
    console.log('getMe called.');

    return this.userService.getMe();
  }

  @Patch()
  updateUser(@Body() user) {
    console.log('updateUser called. Body:');
    console.log(user);

    return this.userService.updateUser();
  }
}
