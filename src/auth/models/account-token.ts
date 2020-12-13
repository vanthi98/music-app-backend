import { Field, ObjectType } from "@nestjs/graphql";
import { Account } from "./account";

@ObjectType()
export class AccountToken {
  @Field()
  access_token: string;

  @Field()
  account: Account;
}
