import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { SongResolver } from "./song.resolver";
import { SongSchema } from "./song.schema";
import { SongService } from "./song.service";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "../profile/profile.module";
import { AccountModule } from "../account/account.module";

@Module({
  imports: [
    ProfileModule,
    AccountModule,
    MongooseModule.forFeature([{ name: "Song", schema: SongSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [SongResolver, SongService],
  exports: [SongService]
})
export class SongModule {}
