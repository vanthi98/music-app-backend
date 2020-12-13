import * as mongoose from "mongoose";

export const AccountSchema = new mongoose.Schema({
  account_name: String,
  password: String
});
