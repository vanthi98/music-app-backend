import { InputType, Field, Int } from "@nestjs/graphql";
@InputType()
export class ProfileInput {
  @Field({ nullable: true })
  readonly account_id?: string;
  @Field({ nullable: true })
  readonly first_name?: string;
  @Field({ nullable: true })
  readonly last_name?: string;
  @Field({ nullable: true })
  readonly email?: string;
  @Field({ nullable: true })
  readonly account_name?: string;
  @Field({ nullable: true })
  readonly age?: number;
  @Field({ nullable: true })
  readonly gender?: boolean;
  @Field({ nullable: true })
  readonly birthday?: string;
  @Field({ nullable: true })
  readonly avatarUrl?: string;
}
