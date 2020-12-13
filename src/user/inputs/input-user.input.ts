import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UserInput {
  @Field()
  readonly name: string;
  @Field(() => Int)
  readonly age: number;
  @Field()
  readonly gender: boolean;
}
