import { ObjectType, Field, ID } from "@nestjs/graphql";
@ObjectType()
export class TestType {
  @Field(() => ID)
  readonly id?: string;
  @Field()
  readonly title: string;
}