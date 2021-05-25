import { UserType } from "./../../comment/dto/comment.dto";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class MessageType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly message_id: string;
  @Field({ nullable: false })
  readonly content: string;
  @Field({ nullable: false })
  readonly createdAt: Date;
  @Field({ nullable: false })
  readonly user: string;
  @Field({ nullable: false })
  readonly room_id: string;
  @Field(() => [String], { nullable: false })
  readonly users: Array<string>;
}

@ObjectType()
export class MessageOutputType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly message_id: string;
  @Field({ nullable: false })
  readonly content: string;
  @Field({ nullable: false })
  readonly createdAt: Date;
  @Field(() => UserType, { nullable: false })
  readonly user: UserType;
  @Field({ nullable: false })
  readonly room_id: string;
  @Field(() => [UserType], { nullable: false })
  readonly users: Array<UserType>;
}
