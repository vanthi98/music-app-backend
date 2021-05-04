import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Profile" },
  song: { type: Schema.Types.ObjectId, ref: "Song" },
  parent: { type: Schema.Types.ObjectId, ref: "Comment" },
  title: String,
  content: String,
  like: Number,
  dislike: Number,
  createdAt: Date,
  updatedAt: Date,
  listLike: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  listDislike: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
});
