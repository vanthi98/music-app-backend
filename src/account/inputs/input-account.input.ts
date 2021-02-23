import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class AccountInput {
  @Field()
  readonly account_name: string;
  @Field()
  readonly password: string;
  @Field()
  readonly email: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field({ nullable: true })
  readonly age?: number;
  @Field()
  readonly gender: boolean;
  @Field()
  readonly birthday: string;
}
