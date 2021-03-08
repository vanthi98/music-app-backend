import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class LoginInput {
  @Field()
  readonly account_name: string;
  @Field()
  readonly password: string;
}
