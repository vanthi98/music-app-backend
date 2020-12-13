import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UserType } from "./dto/create-user.dto";
import { UserInput } from "./inputs/input-user.input";

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => String)
  async hello() {
    return "hello";
  }

  @Query(() => [UserType])
  async user(): Promise<UserType[]> {
    return this.userService.findAll();
  }

  @Mutation(() => UserType)
  async createUser(@Args("input") input: UserInput): Promise<UserInput> {
    return this.userService.create(input);
  }

  @Mutation(() => UserType)
  async updateUser(
    @Args("id") id: string,
    @Args("input") input: UserInput
  ): Promise<UserInput> {
    return this.userService.update(id, input);
  }

  @Mutation(() => UserType)
  async deleteUser(@Args("id") id: string): Promise<UserInput> {
    return this.userService.delete(id);
  }
}
