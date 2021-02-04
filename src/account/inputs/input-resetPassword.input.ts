import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class ResetPasswordInput {
  @Field()
  readonly token: string;
  @Field()
  readonly password: string;
}
