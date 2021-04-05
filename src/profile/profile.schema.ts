import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const ProfileSchema = new mongoose.Schema({
  account_id: String,
  first_name: String,
  last_name: String,
  gender: Boolean,
  age: Number,
  birthday: String,
  account_name: String,
  avatarUrl: String,
  listLikedSong: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});
