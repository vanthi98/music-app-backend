import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProfileResolver } from "./profile.resolver";
import { ProfileSchema } from "./profile.schema";
import { ProfileService } from "./profile.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Profile", schema: ProfileSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "900s" }
    })
  ],
  providers: [ProfileResolver, ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
