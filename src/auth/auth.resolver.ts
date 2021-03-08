import { LoginInput } from "./inputs/input-login.input";
import { UseGuards } from "@nestjs/common";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AccountType } from "../account/dto/create-account.dto";
import { AccountInput } from "../account/inputs/input-account.input";
import { GqlAuthGuard } from "./graphqlAuth";
import { AccountToken } from "./models/account-token";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  //@UseGuards(GqlAuthGuard)
  @Mutation(() => AccountToken)
  async login(
    @Args({ name: "input", type: () => LoginInput }) input: LoginInput
  ): Promise<AccountToken> {
    return this.authService.login(input);
  }

  // @Mutation(() => AccountType)
  // async createAcccount(
  //   @Args({ name: "input", type: () => AccountInput }) input: AccountInput
  // ): Promise<any> {
  //   return this.authService.
  // };
}
