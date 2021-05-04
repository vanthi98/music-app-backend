import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { PlaylistService } from "./playlist.service";
import { PlaylistType, CreatePlaylistType } from "./dto/playlist.dto";
import { SongType } from "../song/dto/song.dto";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";

@Resolver()
export class PlaylistResolver {
  constructor(private readonly playlistService: PlaylistService) {}

  @Mutation(() => CreatePlaylistType)
  @UseGuards(GqlAuthGuard)
  async createPlaylist(
    @CtxUser() currentUser,
    @Args("input") input: CreatePlaylistInput
  ): Promise<CreatePlaylistType> {
    const email = currentUser.payload.accountId;
    return this.playlistService.createPlaylist(email, input);
  }

  @Mutation(() => CreatePlaylistType)
  @UseGuards(GqlAuthGuard)
  async addSongToPlaylist(
    @Args("playlist_id") playlist_id: string,
    @Args("song_id") song_id: string
  ): Promise<CreatePlaylistType> {
    return this.playlistService.addSongToPlaylist(playlist_id, song_id);
  }

  @Mutation(() => CreatePlaylistType)
  @UseGuards(GqlAuthGuard)
  async removeSongFromPlaylist(
    @Args("playlist_id") playlist_id: string,
    @Args("song_id") song_id: string
  ): Promise<CreatePlaylistType> {
    return this.playlistService.removeSongFromPlaylist(playlist_id, song_id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async removePlaylist(
    @CtxUser() currentUser,
    @Args("playlist_id") playlist_id: string
  ): Promise<string> {
    const email = currentUser.payload.accountId;
    return this.playlistService.deletePlaylist(email, playlist_id);
  }

  @Query(() => [PlaylistType])
  @UseGuards(GqlAuthGuard)
  async getAllPlaylist(@CtxUser() currentUser): Promise<Array<PlaylistType>> {
    const email = currentUser.payload.accountId;
    return this.playlistService.getAllPlaylist(email);
  }

  @Query(() => [SongType])
  @UseGuards(GqlAuthGuard)
  async getSongByPlaylist(
    @Args("playlist_id") playlist_id: string
  ): Promise<Array<SongType>> {
    return this.playlistService.getSongByPlaylist(playlist_id);
  }

  @Query(() => PlaylistType)
  @UseGuards(GqlAuthGuard)
  async getPlaylistById(
    @Args("playlist_id") playlist_id: string
  ): Promise<PlaylistType> {
    return this.playlistService.getPlaylistById(playlist_id);
  }
}
