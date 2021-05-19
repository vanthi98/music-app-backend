import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const SongSchema = new Schema({
  id: { type: Schema.Types.ObjectId, unique: true, require: true },
  song_name: { type: String },
  song_url: String,
  song_image_url: String,
  lyric: String,
  author: String,
  like: Number,
  comment: Number,
  listen: Number,
  share: Number,
  uploader: String,
  duration: Number,
  createdAt: Date,
  updatedAt: Date,
  status: Boolean,
  listLikedUser: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  listComment: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  country: { type: Schema.Types.ObjectId, ref: "Country" },
  category: { type: Schema.Types.ObjectId, ref: "Category" }
});
