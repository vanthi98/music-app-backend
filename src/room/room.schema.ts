import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const RoomSchema = new Schema({
  room_id: String,
  createdAt: Date,
  type: String, // type is Chat 1-1 or group chat or solo (used to save files)
  users: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});
