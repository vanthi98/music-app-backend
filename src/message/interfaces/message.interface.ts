import { Document } from "mongoose";

export interface Message extends Document {
  readonly message_id: string;
  readonly createdAt: Date;
  readonly user: string;
  readonly content: string;
  readonly room_id: string;
}
