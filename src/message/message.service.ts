import { RoomService } from "./../room/room.service";
import { ProfileService } from "./../profile/profile.service";
import { MessageInput } from "./inputs/message.input";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Message } from "./interfaces/message.interface";
import { MessageType } from "src/message/dto/message.dto";
import * as mongoose from "mongoose";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel("Message") private messageModel: Model<Message>,
    private readonly profileService: ProfileService,
    @Inject(forwardRef(() => RoomService))
    private readonly roomService: RoomService
  ) {}

  async createMessage(
    input: MessageInput,
    email: string
  ): Promise<MessageType> {
    const current = new Date();
    const maxIdMessage = await this.messageModel
      .find({})
      .collation({ locale: "vi", numericOrdering: true })
      .sort({ message_id: -1 })
      .limit(1);
    const message_id = maxIdMessage[0]?.message_id || undefined;
    const profile = await this.profileService.getProfileByEmail(email);
    if (!profile) {
      throw new Error("Không thể tìm thấy người dùng này");
    }
    const { id } = profile;
    const { room_id } = input;
    const newMessage = new this.messageModel({
      ...input,
      message_id: message_id ? (parseInt(message_id) + 1).toString() : 0,
      user: id,
      createdAt: current
    });
    const result = await newMessage.save();
    const {
      _id,
      content,
      room_id: roomId,
      user,
      message_id: MessageId,
      createdAt
    } = result;
    const room = await this.roomService.findRoomByRoomId(room_id);
    if (!room) {
      throw new Error("Phòng không tồn tại");
    }
    const { messages } = room;
    if (!messages || messages.length === 0) {
      await this.roomService.update(
        {
          messages: [...messages, new mongoose.mongo.ObjectId(_id)]
        },
        room._id
      );
    } else {
      if (messages.indexOf(_id) > -1) {
        throw new Error("Tin nhắn đã có trong phòng");
      } else {
        await this.roomService.update(
          {
            messages: [...messages, new mongoose.mongo.ObjectId(_id)]
          },
          room._id
        );
      }
    }
    return {
      _id,
      content,
      room_id: roomId,
      user,
      message_id: MessageId,
      createdAt,
      users: room.users
    };
  }

  async getMessageById(id: string): Promise<MessageType> {
    return await this.messageModel.findOne({ _id: id });
  }
}
