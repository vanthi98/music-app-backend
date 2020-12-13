import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly gender: boolean;
}
