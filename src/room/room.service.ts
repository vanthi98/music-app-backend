import { MessageService } from "./../message/message.service";
import { UserType } from "./../comment/dto/comment.dto";
import { ProfileService } from "./../profile/profile.service";
import { RoomType, RoomOutputType } from "./dto/room.dto";
import { RoomInput } from "./inputs/room.input";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Room } from "./interfaces/root.interface";

@Injectable()
export class RoomService {
  constructor(
    @InjectModel("Room") private roomModel: Model<Room>,
    @Inject(forwardRef(() => MessageService))
    private readonly messageService: MessageService,
    private readonly profileService: ProfileService
  ) {}

  async createRoom(
    input: RoomInput,
    email: string,
    list_users: Array<string>
  ): Promise<RoomType> {
    const current = new Date();
    const maxIdRoom = await this.roomModel
      .find({})
      .collation({ locale: "vi", numericOrdering: true })
      .sort({ room_id: -1 })
      .limit(1);
    const room_id = maxIdRoom[0]?.room_id || undefined;
    const profile = await this.profileService.getProfileByEmail(email);
    const { id } = profile;
    const users =
      list_users && list_users.length > 0 ? [id, ...list_users] : [id];
    const findUsers = await this.roomModel.find({ users });
    if (findUsers.length > 0) {
      throw new Error("Phòng này đã tồn tại");
    }
    const newRoom = new this.roomModel({
      ...input,
      room_id: room_id ? (parseInt(room_id) + 1).toString() : 0,
      createdAt: current,
      users
    });
    const result = await newRoom.save();
    return result;
  }

  async findRoomByRoomId(room_id: string): Promise<RoomType> {
    return await this.roomModel.findOne({ room_id }).populate("");
  }
  async update(roomDto: Room, roomId: string): Promise<RoomType> {
    const updateRoom = await this.roomModel.findByIdAndUpdate(roomId, roomDto, {
      new: true
    });
    return await updateRoom;
  }

  async getRoomDetail(room_id: string): Promise<RoomOutputType> {
    const room = await this.roomModel.findOne({ room_id });
    const {
      users,
      messages,
      _id,
      room_id: roomId,
      createdAt,
      type,
      status
    } = room;
    let listUsers: Array<UserType> = [];
    for (let i = 0; i < users.length; i++) {
      const user = await this.profileService.getProfileById(users[i]);
      const { account_name, avatarUrl } = user;
      listUsers.push({
        account_name,
        avatarUrl
      });
    }
    let listMessage = [];
    for (let i = 0; i < messages.length; i++) {
      const message = await this.messageService.getMessageById(messages[i]);
      const {
        user: user_id,
        _id,
        content,
        room_id,
        message_id,
        createdAt
      } = message;
      const user = await this.profileService.getProfileById(user_id);
      const { account_name, avatarUrl } = user;
      listMessage.push({
        _id,
        content,
        room_id,
        message_id,
        createdAt,
        user: { account_name, avatarUrl }
      });
    }
    return {
      messages: listMessage,
      _id,
      room_id: roomId,
      createdAt,
      type,
      status,
      users: listUsers
    };
  }

  async getAllRoomByCurrentAccount(
    email: string
  ): Promise<Array<RoomOutputType>> {
    const profile = await this.profileService.getProfileByEmail(email);
    const { id } = profile;
    try {
      const rooms = await this.roomModel.find({ users: id });
      let result = [];
      for (let i = 0; i < rooms.length; i++) {
        const { room_id } = rooms[i];
        const room = await this.getRoomDetail(room_id);
        result.push(room);
      }
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}
