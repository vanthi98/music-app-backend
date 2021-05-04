import { ProfileService } from "./../profile/profile.service";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreatePlaylistType, PlaylistType } from "./dto/playlist.dto";
import { SongType } from "../song/dto/song.dto";
import { Playlist } from "./interfaces/playlist.interface";
import { SongService } from "./../song/song.service";
import { CreatePlaylistInput } from "./inputs/create-playlist.input";
import * as mongoose from "mongoose";

@Injectable()
export class PlaylistService {
  constructor(
    @InjectModel("Playlist") private playlistModel: Model<Playlist>,
    private readonly songService: SongService,
    private readonly profileService: ProfileService
  ) {}

  async createPlaylist(
    email: string,
    input?: CreatePlaylistInput
  ): Promise<CreatePlaylistType> {
    const current = new Date();
    const profile = await this.profileService.getProfileByEmail(email);
    const { id } = profile;
    const newPlaylist: Model = new this.playlistModel({
      ...input,
      user: id,
      createdAt: current,
      updatedAt: current
    });
    const result = await newPlaylist.save();
    const { _id } = result;
    const { listPlaylist } = profile;
    await this.profileService.update(
      { listPlaylist: [...listPlaylist, new mongoose.mongo.ObjectId(_id)] },
      id
    );
    return result;
  }

  async addSongToPlaylist(
    playlist_id: string,
    song_id: string
  ): Promise<CreatePlaylistType> {
    const current = new Date();
    const playlist = await this.playlistModel.findById(playlist_id);
    const findSong = await this.songService.findOne(song_id);
    if (!findSong) {
      throw new Error("Bài hát không tồn tại");
    }
    const { listSong } = playlist;
    const listSongLength = listSong.length;
    for (let i = 0; i < listSongLength; i++) {
      if (listSong[i].toString() === song_id) {
        throw new Error("Bài hát đã có sẵn trong playlist này");
      }
    }
    const result = await this.playlistModel.findByIdAndUpdate(
      playlist_id,
      {
        listSong: [...listSong, new mongoose.mongo.ObjectId(song_id)],
        updatedAt: current
      },
      { new: true }
    );
    return result;
  }

  async removeSongFromPlaylist(
    playlist_id: string,
    song_id: string
  ): Promise<CreatePlaylistType> {
    const current = new Date();
    const playlist = await this.playlistModel.findById(playlist_id);
    const findSong = await this.songService.findOne(song_id);
    if (!findSong) {
      throw new Error("Bài hát không tồn tại");
    }
    const { listSong } = playlist;
    if (!listSong || listSong.length === 0) {
      throw new Error("Lỗi xảy ra khi xóa bài hát khỏi playlist");
    } else {
      if (listSong.indexOf(song_id) > -1) {
        const temp = listSong;
        temp.splice(listSong.indexOf(song_id), 1);
        await this.playlistModel.findOneAndUpdate(
          { _id: playlist_id },
          {
            listSong: temp
          },
          { new: true }
        );
      } else {
        throw new Error(
          "This user is not exist in list liked user of this song"
        );
      }
    }
    return playlist;
  }

  async deletePlaylist(email, playlist_id): Promise<string> {
    const result = await this.playlistModel.findByIdAndDelete(playlist_id);
    if (!result) {
      throw new Error("Lỗi xảy ra khi xóa playlist");
    }
    const profile = await this.profileService.getProfileByEmail(email);
    const { listPlaylist, id } = profile;
    if (!listPlaylist || listPlaylist.length === 0) {
      throw new Error("Danh sách playlist của bạn rỗng");
    } else {
      if (listPlaylist.indexOf(playlist_id) > -1) {
        const temp = listPlaylist;
        temp.splice(listPlaylist.indexOf(playlist_id), 1);
        await this.profileService.update(
          {
            listPlaylist: temp
          },
          id
        );
      } else {
        throw new Error(
          "Playlist này không có trong danh sách playlist của bạn"
        );
      }
    }
    return result._id;
  }

  async getAllPlaylist(email: string): Promise<Array<PlaylistType>> {
    const profile = await this.profileService.getProfileByEmail(email);
    if (!profile) {
      throw new Error("Không thể tìm thấy profile người dùng");
    }
    const { listPlaylist } = profile;
    const listPlaylistLength = listPlaylist.length;
    const result = [];
    for (let i = 0; i < listPlaylistLength; i++) {
      const playlist = await this.playlistModel.findById(
        listPlaylist[i].toString()
      );
      result.push(playlist);
    }
    return result;
  }

  async getSongByPlaylist(playlist_id: string): Promise<Array<SongType>> {
    const playlist: PlaylistType = await this.playlistModel.findById(
      playlist_id
    );
    if (!playlist) {
      throw new Error("Không thể tìm thấy playlist");
    }
    const { listSong } = playlist;
    const listSongLength: number = listSong.length;
    const result = [];
    for (let i = 0; i < listSongLength; i++) {
      const song: SongType = await this.songService.findOne(
        listSong[i].toString()
      );
      if (song) result.push(song);
    }
    return result;
  }

  async getPlaylistById(playlist_id: string): Promise<PlaylistType> {
    try {
      const playlist: PlaylistType = await this.playlistModel.findById(
        playlist_id
      );
      return playlist;
    } catch {
      throw new Error("Có lỗi xảy ra khi lấy thông tin playlist");
    }
  }
}
