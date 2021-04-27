import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CommentResolver } from "./comment.resolver";
import { CommentSchema } from "./comment.schema";
import { CommentService } from "./comment.service";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "../profile/profile.module";
import { SongModule } from "../song/song.module";

@Module({
  imports: [
    ProfileModule,
    SongModule,
    MongooseModule.forFeature([{ name: "Comment", schema: CommentSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [CommentResolver, CommentService],
  exports: [CommentService]
})
export class CommentModule {}
