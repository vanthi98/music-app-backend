import { PubSubModule } from "./../pub-sub/pub-sub.module";
import { RoomModule } from "./../room/room.module";
import { ProfileModule } from "./../profile/profile.module";
import { MessageSchema } from "./message.schema";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { Module, forwardRef } from "@nestjs/common";
import { MessageService } from "./message.service";
import { MessageResolver } from "./message.resolver";

@Module({
  imports: [
    PubSubModule,
    ProfileModule,
    forwardRef(() => RoomModule),
    MongooseModule.forFeature([{ name: "Message", schema: MessageSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [MessageService, MessageResolver],
  exports: [MessageService]
})
export class MessageModule {}
