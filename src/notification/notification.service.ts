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
import { AccountService } from "../account/account.service";

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel("Notification") private noticeModel: Model<Notification>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService
  ) {}

  async createNotice(
    input: NotificationInput,
    user_id: string
  ): Promise<CreateNotificationType> {
    console.log("[user id]", user_id);
    const current = new Date();
    const maxIdNotice = await this.noticeModel
      .find({})
      .sort({ notice_id: -1 })
      .limit(1);
    const { notice_id } = maxIdNotice[0];
    const newNotice = new this.noticeModel({
      ...input,
      notice_id: notice_id ? (parseInt(notice_id) + 1).toString() : 0,
      user: user_id,
      thumbnail: "",
      createAt: current
    });
    return await newNotice.save();
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
}
