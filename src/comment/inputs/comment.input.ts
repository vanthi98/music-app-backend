import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class CommentInput {
  @Field({ nullable: false })
  readonly title: string;
  @Field({ nullable: false })
  readonly content: string;
}
