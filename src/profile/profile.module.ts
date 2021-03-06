import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileResolver } from "./profile.resolver";
import { ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";
import { JwtModule } from "@nestjs/jwt";
import { AccountModule } from "../account/account.module";
import { forwardRef } from "@nestjs/common";

@Module({
  imports: [
    forwardRef(() => AccountModule),
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
