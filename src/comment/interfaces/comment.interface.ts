import { Document } from "mongoose";

export interface Comment extends Document {
  readonly id?: string;
  readonly user: string;
  readonly song: string;
  readonly title: string;
  readonly parent?: string;
  readonly like: number;
  readonly dislike: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly children: Array<string>;
  readonly replyTo: string;
}
