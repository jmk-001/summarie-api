import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UpdateUserInput } from './dto';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async getUser(@Args('userId', { type: () => String }) userId: string) {
    return this.userService.getUser(userId);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('userId', { type: () => String }) userId: string,
    @Args('data') data: UpdateUserInput,
  ) {
    return this.userService.updateUser(userId, data);
  }
}
