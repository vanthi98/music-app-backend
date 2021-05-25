import { RoomInput } from "./inputs/room.input";
import { RoomType, RoomOutputType } from "./dto/room.dto";
import { RoomService } from "./room.service";
import { Resolver, Mutation, Args, Subscription, Query } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";
import { PubSub } from "apollo-server-express";
import { Inject } from "@nestjs/common";
import { MessageType } from "src/message/dto/message.dto";

@Resolver()
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService,
    @Inject("PUB_SUB")
    private pubsub: PubSub
  ) {}

  @Mutation(() => RoomType)
  @UseGuards(GqlAuthGuard)
  async createRoom(
    @CtxUser() currentUser,
    @Args("input") input: RoomInput,
    @Args("list_users", { nullable: true, type: () => [String] })
    list_users: Array<string>
  ): Promise<RoomType> {
    const email = currentUser.payload.accountId;
    const newRoom = await this.roomService.createRoom(input, email, list_users);
    return newRoom;
  }

  @Query(() => RoomOutputType)
  async getRoomDetail(
    @Args("room_id") room_id: string
  ): Promise<RoomOutputType> {
    return this.roomService.getRoomDetail(room_id);
  }

  @Query(() => [RoomOutputType])
  @UseGuards(GqlAuthGuard)
  async getAllRoom(@CtxUser() currentUser): Promise<Array<RoomOutputType>> {
    const email = currentUser.payload.accountId;
    const rooms = await this.roomService.getAllRoomByCurrentAccount(email);
    return rooms;
  }

  @Subscription(returns => MessageType, {
    filter(payload, variables) {
      const { users } = payload.messageSend;
      return users
        .map(user => user.toString())
        .includes(variables.profile_id.toString());
    }
  })
  messageSend(@Args("profile_id") profile_id: string) {
    return this.pubsub.asyncIterator("messageSend");
  }
}
