import { ObjectType, Field, Int, ID } from "@nestjs/graphql";
@ObjectType()
export class AccountType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly account_name: string;
  @Field()
  readonly password: string;
  @Field({ nullable: true })
  resetPasswordToken?: string;
  @Field({ nullable: true })
  resetPasswordExpires?: number;
}
