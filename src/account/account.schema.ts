import { Int } from "@nestjs/graphql";
import * as mongoose from "mongoose";

export const AccountSchema = new mongoose.Schema({
  email: String,
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Number
});
