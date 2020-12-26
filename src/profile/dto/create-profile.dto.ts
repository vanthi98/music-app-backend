import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class ProfileType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly account_id: string;
  @Field()
  readonly first_name: string;
  @Field()
  readonly last_name: string;
  @Field()
  readonly email: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly gender: boolean;
  @Field()
  readonly birthday: string;
}
