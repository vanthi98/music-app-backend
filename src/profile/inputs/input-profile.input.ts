import { InputType, Field } from "@nestjs/graphql";
@InputType()
export class ProfileInput {
  @Field()
  readonly account_id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field()
  readonly age: number;
  @Field()
  readonly gender: boolean;
  @Field()
  readonly birthday: string;
}
