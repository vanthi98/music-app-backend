import { MessageModule } from "./../message/message.module";
import { PubSubModule } from "./../pub-sub/pub-sub.module";
import { ProfileModule } from "./../profile/profile.module";
import { Module } from "@nestjs/common";
import { RoomService } from "./room.service";
import { RoomResolver } from "./room.resolver";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { RoomSchema } from "./room.schema";

@Module({
  imports: [
    MessageModule,
    PubSubModule,
    ProfileModule,
    MongooseModule.forFeature([{ name: "Room", schema: RoomSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [RoomService, RoomResolver],
  exports: [RoomService]
})
export class RoomModule {}
