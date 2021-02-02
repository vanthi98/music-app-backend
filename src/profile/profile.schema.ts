import * as mongoose from "mongoose";

export const ProfileSchema = new mongoose.Schema({
  account_id: String,
  first_name: String,
  last_name: String,
  gender: Boolean,
  age: Number,
  birthday: String,
  email: String,
  avatarUrl: String
});
