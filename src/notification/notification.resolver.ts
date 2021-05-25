import { PubSub } from "apollo-server-express";
import { Inject } from "@nestjs/common";
import { Resolver, Query, Mutation, Subscription, Args } from "@nestjs/graphql";
import { NotificationService } from "./notification.service";
import {
  NotificationType,
  CreateNotificationType
} from "./dto/notification.dto";
import { NotificationInput } from "./inputs/notification.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";

@Resolver()
export class NotificationResolver {
  constructor(
    private readonly noticeService: NotificationService,
    @Inject("PUB_SUB")
    private pubsub: PubSub
  ) {}

  @Mutation(() => CreateNotificationType)
  async createNotification(
    @Args("input") input: NotificationInput,
    @Args("user_id") user_id: string
  ): Promise<CreateNotificationType> {
    const newNotice = await this.noticeService.createNotice(input, user_id);
    return newNotice;
  }

  @Query(() => [NotificationType])
  @UseGuards(GqlAuthGuard)
  async getNoticeByCurrentAccount(
    @CtxUser() currentUser
  ): Promise<Array<NotificationType>> {
    return this.noticeService.getNoticesByUser(currentUser);
  }

  @Mutation(() => NotificationType)
  async markReadNotice(
    @Args("notice_id") notice_id: string
  ): Promise<NotificationType> {
    return this.noticeService.changeStatusNotice(notice_id, "read");
  }

  @Mutation(() => NotificationType)
  async hideNotice(
    @Args("notice_id") notice_id: string
  ): Promise<NotificationType> {
    return this.noticeService.changeStatusNotice(notice_id, "hide");
  }

  @Subscription(returns => CreateNotificationType, {
    filter: (payload, variables): boolean => {
      const { user } = payload.notificationAdded;
      return user.toString() === variables.profile_id.toString();
    }
  })
  notificationAdded(@Args("profile_id") profile_id: string) {
    return this.pubsub.asyncIterator("notificationAdded");
  }
}
