import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { SongService } from "./song.service";
import { UploadSongType, SongType } from "./dto/song.dto";
import { SongInput } from "./inputs/input-upload-song.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";
@Resolver()
export class SongResolver {
  constructor(private readonly songService: SongService) {}

  @Mutation(() => UploadSongType)
  @UseGuards(GqlAuthGuard)
  async uploadSong(
    @CtxUser() currentUser,
    @Args("input") input: SongInput
  ): Promise<UploadSongType> {
    return this.songService.uploadSong(currentUser.payload.accountId, input);
  }

  @Query(() => [SongType])
  async getAllSong(): Promise<Array<SongType>> {
    return this.songService.getAllSong();
  }

  @Query(() => [SongType])
  @UseGuards(GqlAuthGuard)
  async getSongByCurrentAccount(
    @CtxUser() currentUser
  ): Promise<Array<SongType>> {
    return this.songService.getUploadedSong(currentUser);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async likeSong(
    @CtxUser() currentUser,
    @Args("song_id") song_id: string
  ): Promise<any> {
    return this.songService.likeSong(song_id, currentUser);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async unlikeSong(
    @CtxUser() currentUser,
    @Args("song_id") song_id: string
  ): Promise<any> {
    return this.songService.unlikeSong(song_id, currentUser);
  }

  @Mutation(() => String)
  async listenSong(@Args("song_id") song_id: string): Promise<any> {
    return this.songService.ListenSong(song_id);
  }
}
