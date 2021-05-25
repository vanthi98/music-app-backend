import { RoomService } from "./../room/room.service";
import { MessageInput } from "./inputs/message.input";
import { CtxUser } from "./../auth/decorators/ctx-account.decorator";
import { GqlAuthGuard } from "./../auth/graphqlAuth";
import { UseGuards } from "@nestjs/common";
import { MessageType } from "./dto/message.dto";
import { MessageService } from "./message.service";
import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { PubSub } from "apollo-server-express";
import { Inject } from "@nestjs/common";

@Resolver()
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject("PUB_SUB")
    private pubsub: PubSub
  ) {}

  @Mutation(() => MessageType)
  @UseGuards(GqlAuthGuard)
  async createMessage(
    @CtxUser() currentUser,
    @Args("input") input: MessageInput
  ): Promise<MessageType> {
    const email = currentUser.payload.accountId;
    const newMessage = await this.messageService.createMessage(input, email);
    this.pubsub.publish("messageSend", { messageSend: newMessage });
    return newMessage;
  }
}
