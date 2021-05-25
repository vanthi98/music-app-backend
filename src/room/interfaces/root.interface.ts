import { Document } from "mongoose";

export interface Room extends Document {
  readonly room_id?: string;
  readonly createdAt?: Date;
  readonly type?: string;
  readonly users?: Array<string>;
  readonly messages?: Array<string>;
}
