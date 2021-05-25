import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Song } from "./interfaces/song.interface";
import { SongInput, SongUpdateInput } from "./inputs/input-upload-song.input";
import { UploadSongType, SongType } from "./dto/song.dto";
import { ProfileService } from "../profile/profile.service";
import { AccountService } from "../account/account.service";
import * as mongoose from "mongoose";
import * as moment from "moment";

const G = 1.2;

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
    const current = new Date();
    const { lyric } = input;
    const newSong: Model = new this.songModel({
      ...input,
      lyric: lyric ? lyric : "",
      like: 0,
      comment: 0,
      share: 0,
      listen: 0,
      uploader: account_id,
      createdAt: current,
      updatedAt: current
    });
    return await newSong.save();
  }

  async findOne(songId: string): Promise<SongType> {
    return await this.songModel.findById(songId);
  }

  async getAllSong(
    keyword: string,
    page: number = 1,
    limit: number
  ): Promise<Array<SongType>> {
    if (keyword) {
      const listSong = await this.songModel
        .find({
          song_name: { $regex: new RegExp(keyword, "i") }
        })
        .skip(0)
        .limit(limit * page);
      return listSong;
    } else {
      const listSong = await this.songModel
        .find({})
        .skip(0)
        .limit(limit * page);
      return listSong;
    }
  }

  async update(songDto: Song, songId: string): Promise<SongType> {
    const updateSong = await this.songModel.findByIdAndUpdate(songId, songDto, {
      new: true
    });
    return await updateSong;
  }

  async updateListComment(
    listComment: Array<any>,
    songId: string
  ): Promise<SongType> {
    const updateComment = await this.songModel.findOneAndUpdate(
      { _id: songId },
      { listComment },
      { new: true }
    );
    return await updateComment;
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

  async getUploadedSongById(id: string): Promise<Array<SongType>> {
    try {
      const profile = await this.profileService.getProfileById(id);
      const account = await this.accountService.findOne(profile.account_id);
      const { email } = account;
      const listSongById = this.songModel.find({
        uploader: email
      });
      return listSongById;
    } catch (error) {
      throw new Error(error);
    }
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
        // eslint-disable-next-line
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

  async getSongByTrending(): Promise<Array<SongType>> {
    // Sử dụng thuật toán trending của youtube, reddit, ...
    const songs = await this.songModel.find({});
    const current = new Date();
    const scoreSong = songs.map(song => {
      const { like, listen, createdAt, listComment } = song;
      const comment = listComment.length;
      const n = listen + like * 5 + comment * 5;
      const seconds = moment(current).unix() - moment(createdAt).unix();
      const score = n / Math.pow(seconds / 3600, G);
      song.score = score;
      return song;
    });
    return scoreSong;
  }

  async getRelatedSongBySong(): Promise<Array<SongType>> {
    // Tìm theo uploader => Sau đó tới country => Sau đó tới category
    // Vd: bài A và B chung người upload, +4 đ, A và C chung country +3 đ, bài A và D chung category +2 đ
    // bài A và E chung người upload và chung country + 4*3 = 12đ
    // bài A và F chung người upload và chung category + 4*2 = 8đ
    // => Danh sách bài hát relative của bài hát A là: E(12) => F(8) => B(4) => C(3) => D(2) => ..
    // List trên lấy ra 5 bài có điểm cao nhất, trả về
    // Nếu không đủ 5 bài thì random ngẫu nhiên trả về cho đủ 5 bài
    return [];
  }
}
