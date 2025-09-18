import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getMe() {
    console.log('Getting me');
  }

  updateUser() {
    console.log('Updating user');
  }
}
