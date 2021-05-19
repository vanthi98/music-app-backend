import { NotificationModule } from "./../notification/notification.module";
import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileResolver } from "./profile.resolver";
import { ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [
    forwardRef(() => AccountModule),
    forwardRef(() => NotificationModule),
    MongooseModule.forFeature([{ name: "Profile", schema: ProfileSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
