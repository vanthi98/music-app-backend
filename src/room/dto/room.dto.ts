import {
  MessageType,
  MessageOutputType
} from "./../../message/dto/message.dto";
import { UserType } from "./../../comment/dto/comment.dto";
import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class RoomType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly room_id: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field()
  readonly type: string;
  @Field()
  readonly status: string;
  @Field(() => [String], { nullable: false })
  readonly users: Array<string>;
  @Field(() => [MessageType], { nullable: true })
  readonly messages?: Array<MessageType>;
}

@ObjectType()
export class RoomOutputType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly room_id: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field()
  readonly type: string;
  @Field()
  readonly status: string;
  @Field(() => [UserType], { nullable: false })
  readonly users: Array<UserType>;
  @Field(() => [MessageOutputType], { nullable: true })
  readonly messages?: Array<MessageOutputType>;
}
