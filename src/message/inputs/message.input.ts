import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class MessageInput {
  @Field({ nullable: true })
  readonly content: string;
  @Field({ nullable: true })
  readonly room_id: string;
}
