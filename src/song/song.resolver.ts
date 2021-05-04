import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { SongService } from "./song.service";
import { UploadSongType, SongType } from "./dto/song.dto";
import { SongInput, SongUpdateInput } from "./inputs/input-upload-song.input";
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
  async getAllSong(
    @Args("keyword", { nullable: true, type: () => String }) keyword: string
  ): Promise<Array<SongType>> {
    return this.songService.getAllSong(keyword);
  }

  @Query(() => SongType)
  async getSong(
    @Args("song_id", { nullable: true, type: () => String }) song_id: string
  ): Promise<SongType> {
    return this.songService.findOne(song_id);
  }

  @Query(() => [SongType])
  @UseGuards(GqlAuthGuard)
  async getSongByCurrentAccount(
    @CtxUser() currentUser
  ): Promise<Array<SongType>> {
    return this.songService.getUploadedSong(currentUser);
  }

  @Query(() => [SongType])
  async getSongByAccount(
    @Args("account_email") account_email: string
  ): Promise<Array<SongType>> {
    return this.songService.getUploadedSongByAccount(account_email);
  }

  @Query(() => [SongType])
  @UseGuards(GqlAuthGuard)
  async getLikedSongByCurrentAccount(
    @CtxUser() user
  ): Promise<Array<SongType>> {
    const email = user.payload.accountId;
    const listSong = await this.songService.getLikedSong(email);
    return listSong;
  }

  @Query(() => [SongType])
  @UseGuards(GqlAuthGuard)
  async getHistoryByCurrentAccount(@CtxUser() user): Promise<Array<SongType>> {
    const email = user.payload.accountId;
    const listSong = await this.songService.getHistory(email);
    return listSong;
  }

  @Query(() => [SongType])
  async getLikedSongByEmail(
    @Args("account_email") account_email: string
  ): Promise<Array<SongType>> {
    const listSong = await this.songService.getLikedSong(account_email);
    return listSong;
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
  @UseGuards(GqlAuthGuard)
  async listenSong(
    @CtxUser() currentUser,
    @Args("song_id") song_id: string
  ): Promise<any> {
    const email = currentUser.payload.accountId;
    return this.songService.ListenSong(email, song_id);
  }

  @Mutation(() => SongType)
  @UseGuards(GqlAuthGuard)
  async updateSong(
    @CtxUser() currentUser,
    @Args("song_id") song_id: string,
    @Args("input") input: SongUpdateInput
  ): Promise<SongType> {
    const email = currentUser.payload.accountId;
    return this.songService.updateSong(email, song_id, input);
  }
}
