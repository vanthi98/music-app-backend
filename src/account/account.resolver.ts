import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
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
}
