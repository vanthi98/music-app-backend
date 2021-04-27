import { CommentInput } from "./inputs/comment.input";
import { CreateCommentType, CommentType } from "./dto/comment.dto";
import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Comment } from "./interfaces/comment.interface";
import { ProfileService } from "../profile/profile.service";
import { SongService } from "./../song/song.service";
import * as mongoose from "mongoose";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel("Comment") private commentModel: Model<Comment>,
    private readonly profileService: ProfileService,
    private readonly songService: SongService
  ) {}

  async createComment(
    email: string,
    song_id: string,
    parent?: string,
    input?: CommentInput
  ): Promise<CreateCommentType> {
    const current = new Date();
    const profile = await this.profileService.getProfileByEmail(email);
    const { id } = profile;
    const newComment: Model = new this.commentModel({
      ...input,
      user: id,
      song: song_id,
      parent,
      like: 0,
      dislike: 0,
      createdAt: current,
      updatedAt: current
    });
    const result = await newComment.save();
    const { _id } = result;
    const song = await this.songService.findOne(song_id);
    const { listComment } = song;
    await this.songService.updateListComment(
      [...listComment, new mongoose.mongo.ObjectId(_id)],
      song_id
    );
    return result;
  }

  async getCommentsBySong(songId: string): Promise<Array<CommentType>> {
    const song = await this.songService.findOne(songId);
    const { listComment } = song;
    const result: Array<CommentType> = [];
    const listCommentLength = listComment.length;
    for (let i = 0; i < listCommentLength; i++) {
      const comment = await this.commentModel.findById(listComment[i]);
      const { user } = comment;
      const profile = await this.profileService.getProfileById(user);
      const {
        _id,
        song,
        parent,
        title,
        content,
        like,
        dislike,
        createdAt,
        updatedAt
      } = comment;

      const adapterComment = {
        _id,
        song,
        parent,
        title,
        content,
        like,
        dislike,
        createdAt,
        updatedAt,
        user: {
          account_name: profile.account_name,
          avatarUrl: profile.avatarUrl
        }
      };
      result.push(adapterComment);
    }
    console.log(result);
    return result;
  }

  async likeComment(commentId: string): Promise<CommentType> {
    const comment = await this.commentModel.findOne(commentId);
    /* @TODO: Update field like to 1 */
    return comment;
  }
}
