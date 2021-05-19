import { Module, forwardRef } from "@nestjs/common";
import { NotificationService } from "./notification.service";
import { NotificationResolver } from "./notification.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { NotificationSchema } from "./notification.schema";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    MongooseModule.forFeature([
      { name: "Notification", schema: NotificationSchema }
    ]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [NotificationService, NotificationResolver],
  exports: [NotificationService]
})
export class NotificationModule {}
