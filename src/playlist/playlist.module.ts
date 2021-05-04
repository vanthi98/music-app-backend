import { PlaylistSchema } from "./playlist.schema";
import { PlaylistResolver } from "./playlist.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { PlaylistService } from "./playlist.service";
import { JwtModule } from "@nestjs/jwt";
import { SongModule } from "../song/song.module";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    SongModule,
    ProfileModule,
    MongooseModule.forFeature([{ name: "Playlist", schema: PlaylistSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [PlaylistResolver, PlaylistService],
  exports: [PlaylistService]
})
export class PlaylistModule {}
