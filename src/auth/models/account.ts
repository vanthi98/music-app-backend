import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Account {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  account_name?: string;

  @Field({ nullable: true })
  password?: string;
}
