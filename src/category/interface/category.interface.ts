import { Document } from "mongoose";

export interface Category extends Document {
  readonly id?: string;
  readonly category_id: number;
  readonly name: string;
  readonly slug: string;
  readonly listSong: Array<string>;
}
