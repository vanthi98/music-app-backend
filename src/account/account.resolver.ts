import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { ResetPasswordInput } from "./inputs/input-resetPassword.input";
import { Account } from "./interfaces/account.interface";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => AccountType)
  async createAccount(
    @Args("input") input: AccountInput
  ): Promise<AccountInput> {
    return this.accountService.create(input);
  }

  @Query(() => [AccountType])
  @UseGuards(GqlAuthGuard)
  async getAllAccount(@CtxUser() user): Promise<AccountType[]> {
    console.log("[user]", user);
    return this.accountService.getAll();
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async getCurrentAccountId(@CtxUser() user): Promise<String> {
    const accountName = user.payload.accountId;
    const account = await this.accountService.findByAccountName(accountName);
    return account.id;
  }

  @Mutation(() => AccountType)
  async resetAccount(@Args("input") input: string): Promise<AccountType> {
    const account = await this.accountService.forgotPassword(input);
    return account;
  }

  @Mutation(() => Boolean)
  async confirmResetPasswordToken(
    @Args("token") token: string
  ): Promise<Boolean> {
    const isValidate = await this.accountService.confirmForgotPasswordToken(
      token
    );
    return isValidate;
  }

  @Mutation(() => AccountType)
  async resetAccountPassword(
    @Args("input") input: ResetPasswordInput
  ): Promise<AccountType> {
    const newPasswordAccount = await this.accountService.resetForgotPassword(
      input
    );
    return newPasswordAccount;
  }
}
