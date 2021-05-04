import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const PlaylistSchema = new Schema({
  listSong: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  user: { type: Schema.Types.ObjectId, ref: "Profile" },
  name: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
});
