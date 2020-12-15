import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { Account } from "./interfaces/account.interface";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation(() => AccountType)
  async createAccount(
    @Args("input") input: AccountInput
  ): Promise<AccountInput> {
    return this.accountService.create(input);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => AccountType)
  async getAllAccount(): Promise<AccountType[]> {
    return this.accountService.getAll();
  }
}
