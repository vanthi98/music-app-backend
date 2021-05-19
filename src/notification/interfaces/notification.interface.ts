import { Document } from "mongoose";

export interface Notification extends Document {
  readonly id: string;
  readonly notice_id: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly createAt: Date;
  readonly type: string;
  readonly status: string;
  readonly description: string;
  readonly user: string;
}
