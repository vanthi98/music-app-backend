import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const MessageSchema = new Schema({
  message_id: String,
  createdAt: Date,
  user: { type: Schema.Types.ObjectId, ref: "Profile" },
  content: String,
  room_id: String
});
