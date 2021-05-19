import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const NotificationSchema = new Schema({
  notice_id: String,
  thumbnail: String,
  title: String,
  createAt: Date,
  type: String,
  status: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "Profile" }
});
