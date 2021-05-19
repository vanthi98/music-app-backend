import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
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
  constructor(private readonly noticeService: NotificationService) {}

  @Mutation(() => CreateNotificationType)
  async createNotification(
    @Args("input") input: NotificationInput,
    @Args("user_id") user_id: string
  ): Promise<CreateNotificationType> {
    return this.noticeService.createNotice(input, user_id);
  }

  @Query(() => [NotificationType])
  @UseGuards(GqlAuthGuard)
  async getNoticeByCurrentAccount(
    @CtxUser() currentUser
  ): Promise<Array<NotificationType>> {
    return this.noticeService.getNoticesByUser(currentUser);
  }
}
