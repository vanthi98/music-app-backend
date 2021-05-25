import { PubSub } from "apollo-server-express";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Notification } from "./interfaces/notification.interface";
import {
  NotificationType,
  CreateNotificationType
} from "./dto/notification.dto";
import { NotificationInput } from "./inputs/notification.input";
import { ProfileService } from "../profile/profile.service";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel("Notification") private noticeModel: Model<Notification>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
    @Inject("PUB_SUB")
    private pubsub: PubSub
  ) {}

  async createNotice(
    input: NotificationInput,
    user_id: string
  ): Promise<CreateNotificationType> {
    const current = new Date();
    const maxIdNotice = await this.noticeModel
      .find({})
      .collation({ locale: "vi", numericOrdering: true })
      .sort({ notice_id: -1 })
      .limit(1);
    const notice_id = maxIdNotice[0]?.notice_id || undefined;
    const newNotice = new this.noticeModel({
      ...input,
      notice_id: notice_id ? (parseInt(notice_id) + 1).toString() : 0,
      user: user_id,
      thumbnail: "",
      createdAt: current
    });
    const result = await newNotice.save();
    this.pubsub.publish("notificationAdded", { notificationAdded: result });
    return result;
  }

  async getNoticesByUser(account_name: any): Promise<Array<NotificationType>> {
    try {
      const { accountId } = account_name.payload;
      const profile = await this.profileService.getProfileByEmail(accountId);
      const { id } = profile;
      const listNotices = await this.noticeModel.find({
        user: id
      });
      return listNotices;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getNoticeById(notice_id: string): Promise<Notification> {
    try {
      const notice = await this.noticeModel.findById(notice_id);
      return notice;
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeStatusNotice(
    notice_id: string,
    status: string
  ): Promise<NotificationType> {
    try {
      const notice = await this.noticeModel.findOne({ notice_id });
      const { status: currentStatus } = notice;
      if (currentStatus !== "hide") {
        const updatedNotice = await this.noticeModel.findOneAndUpdate(
          { notice_id },
          { status },
          {
            new: true
          }
        );
        return updatedNotice;
      }
      return notice;
    } catch (error) {
      throw new Error(error);
    }
  }
}
