import { Document } from "mongoose";

export interface Playlist extends Document {
  readonly id?: string;
  readonly listSong: Array<string>;
  readonly user: string;
  readonly name: string;
  readonly notes: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
