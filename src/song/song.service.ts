import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Song } from "./interfaces/song.interface";
import { SongInput, SongUpdateInput } from "./inputs/input-upload-song.input";
import { UploadSongType, SongType } from "./dto/song.dto";
import { ProfileService } from "../profile/profile.service";
import { AccountService } from "../account/account.service";
import * as mongoose from "mongoose";
import { max } from "class-validator";

@Injectable()
export class SongService {
  constructor(
    @InjectModel("Song") private songModel: Model<Song>,
    private readonly profileService: ProfileService,
    private readonly accountService: AccountService
  ) {}

  async uploadSong(
    account_id: string,
    input: SongInput
  ): Promise<UploadSongType> {
    const { lyric, song_url } = input;
    const newSong: Model = new this.songModel({
      ...input,
      lyric: lyric ? lyric : "",
      like: 0,
      comment: 0,
      share: 0,
      listen: 0,
      uploader: account_id
    });
    return await newSong.save();
  }

  async getAllSong(keyword: string): Promise<Array<SongType>> {
    if (keyword) {
      const regex = /()()/;
      const listSong = await this.songModel.find({
        song_name: { $regex: new RegExp(keyword, "i") }
      });
      return listSong;
    } else {
      const listSong = await this.songModel.find({});
      return listSong;
    }
  }

  async update(songDto: Song, songId: string): Promise<SongType> {
    const updateSong = await this.songModel.findByIdAndUpdate(songId, songDto, {
      new: true
    });
    return await updateSong;
  }

  async updateSong(
    email: string,
    songId: string,
    songDto: SongUpdateInput
  ): Promise<SongType> {
    const updateSong = await this.songModel.findByIdAndUpdate(songId, songDto, {
      new: true
    });
    return await updateSong;
  }

  async getUploadedSong(account_name: any): Promise<Array<SongType>> {
    const { accountId } = account_name.payload;
    const listSongByAccountName = this.songModel.find({
      uploader: accountId
    });
    return listSongByAccountName;
  }

  async getUploadedSongByAccount(
    account_email: string
  ): Promise<Array<SongType>> {
    try {
      const listSongByAccountName = this.songModel.find({
        uploader: account_email
      });
      return listSongByAccountName;
    } catch (error) {
      throw new Error(error);
    }
  }

  async ListenSong(email: string, song_id: string): Promise<any> {
    try {
      const profile = await this.profileService.getProfileByEmailWithLikedSong(
        email
      );
      const { listHistory } = profile;
      if (!listHistory || listHistory.length === 0) {
        await this.profileService.update(
          {
            listHistory: [
              ...listHistory,
              { song_id: new mongoose.mongo.ObjectId(song_id), order: 1 }
            ]
          },
          profile.id
        );
      } else {
        const isInHistory =
          listHistory.filter(song => {
            return song.song_id.toString() === song_id;
          }).length > 0;
        const maxOrder = Math.max.apply(
          Math,
          listHistory.map(function(song) {
            return song.order;
          })
        );
        if (isInHistory) {
          const temp = listHistory.filter(
            song => song.song_id.toString() !== song_id
          );
          await this.profileService.update(
            {
              listHistory: temp
            },
            profile.id
          );
          await this.profileService.update(
            {
              listHistory: [
                ...temp,
                {
                  song_id: new mongoose.mongo.ObjectId(song_id),
                  order: maxOrder + 1
                }
              ]
            },
            profile.id
          );
        } else {
          await this.profileService.update(
            {
              listHistory: [
                ...listHistory,
                {
                  song_id: new mongoose.mongo.ObjectId(song_id),
                  order: maxOrder + 1
                }
              ]
            },
            profile.id
          );
        }
      }
      const increaseListen = await this.songModel
        .findByIdAndUpdate(song_id, { $inc: { listen: 1 } }, { new: true })
        .exec();
      console.log(increaseListen);
      return increaseListen.listen;
    } catch (error) {
      throw new Error("Cant not listen song" + error);
    }
  }

  async likeSong(song_id: string, currentUser: any): Promise<any> {
    const song = await this.songModel.findOne({ _id: song_id });
    if (!song) {
      throw new Error("Cant find song");
    }

    const { uploader } = song;

    if (uploader === currentUser.payload.accountId) {
      throw new Error("You can not like the song what you uploaded");
    } else {
      const user = await this.accountService.findByEmail(
        currentUser.payload.accountId
      );
      if (!user) {
        throw new Error("Cant find user");
      }
      const account_id = user.id;
      const profile = await this.profileService.getProfileByAccountId(
        account_id
      );
      const { listLikedSong } = profile;
      if (!listLikedSong || listLikedSong.length === 0) {
        await this.profileService.update(
          {
            listLikedSong: [
              ...listLikedSong,
              new mongoose.mongo.ObjectId(song_id)
            ]
          },
          profile.id
        );
      } else {
        if (listLikedSong.indexOf(song_id) > -1) {
          throw new Error("This song is exist in your liked list");
        } else {
          await this.profileService.update(
            {
              listLikedSong: [
                ...listLikedSong,
                new mongoose.mongo.ObjectId(song_id)
              ]
            },
            profile.id
          );
        }
      }

      const { listLikedUser } = song;
      if (!listLikedUser || listLikedUser.length === 0) {
        await this.songModel.findOneAndUpdate(
          { _id: song_id },
          {
            listLikedUser: [
              ...listLikedUser,
              new mongoose.mongo.ObjectId(profile.id)
            ]
          },
          { new: true }
        );
      } else {
        if (listLikedUser.indexOf(profile.id) > -1) {
          throw new Error("This song is exist in your liked list");
        } else {
          await this.songModel.findOneAndUpdate(
            { _id: song_id },
            {
              listLikedUser: [
                ...listLikedUser,
                new mongoose.mongo.ObjectId(profile.id)
              ]
            },
            { new: true }
          );
        }
      }
      const increaseLike = await this.songModel
        .findOneAndUpdate(
          { _id: song_id },
          { $inc: { like: 1 } },
          { new: true }
        )
        .exec();
      if (!increaseLike) {
        throw new Error("Have a error when like song");
      }
    }
    return song.like;
  }

  async unlikeSong(song_id: string, currentUser: any): Promise<any> {
    const song = await this.songModel.findOne({ _id: song_id });
    if (!song) {
      throw new Error("Cant find song");
    }
    const { uploader } = song;
    if (uploader === currentUser.payload.accountId) {
      throw new Error("You can not like the song what you uploaded");
    } else {
      const user = await this.accountService.findByEmail(
        currentUser.payload.accountId
      );
      if (!user) {
        throw new Error("Cant find user");
      }
      const account_id = user.id;
      const profile = await this.profileService.getProfileByAccountId(
        account_id
      );
      const { listLikedSong } = profile;

      if (!listLikedSong || listLikedSong.length === 0) {
        throw new Error("Error occur when unlike song");
      } else {
        if (listLikedSong.indexOf(song_id) > -1) {
          const temp = listLikedSong;
          temp.splice(listLikedSong.indexOf(song_id), 1);
          await this.profileService.update(
            {
              listLikedSong: temp
            },
            profile.id
          );
        } else {
          throw new Error("This song is not exist in your liked list");
        }
      }
      const { listLikedUser } = song;
      if (!listLikedUser || listLikedUser.length === 0) {
        throw new Error("Error occur when unlike song");
      } else {
        if (listLikedUser.indexOf(profile.id) > -1) {
          const temp = listLikedUser;
          temp.splice(listLikedUser.indexOf(song_id), 1);
          await this.songModel.findOneAndUpdate(
            { _id: song_id },
            {
              listLikedUser: temp
            },
            { new: true }
          );
        } else {
          throw new Error(
            "This user is not exist in list liked user of this song"
          );
        }
      }
      const decreaseLike = await this.songModel
        .findOneAndUpdate(
          { _id: song_id },
          { $inc: { like: -1 } },
          { new: true }
        )
        .exec();
      if (!decreaseLike) {
        throw new Error("Have a error when unlike song");
      }
    }
    return song.like;
  }

  async getLikedSong(email: string): Promise<Array<SongType>> {
    const profile = await this.profileService.getProfileByEmailWithLikedSong(
      email
    );
    const { listLikedSong }: { listLikedSong?: Array<string> } = profile;
    const length = listLikedSong.length;
    const listSong: Array<SongType> = [];
    for (let i = 0; i < length; i++) {
      const song = await this.songModel.findById(listLikedSong[i]).exec();
      listSong.push(song);
    }
    return listSong;
  }

  async getHistory(email: string): Promise<Array<SongType>> {
    const profile = await this.profileService.getProfileByEmailWithLikedSong(
      email
    );
    const { listHistory }: { listHistory?: Array<any> } = profile;
    listHistory.sort((a, b) => {
      if (a.order < b.order) return 1;
      if (a.order > b.order) return -1;
      return 0;
    });
    const length = listHistory.length;
    const listSong: Array<SongType> = [];
    for (let i = 0; i < length; i++) {
      const song = await this.songModel.findById(listHistory[i].song_id).exec();
      listSong.push(song);
    }
    return listSong;
  }
}
