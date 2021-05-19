import { Document } from "mongoose";

export interface Country extends Document {
  readonly id?: string;
  readonly country_id: number;
  readonly name: string;
  readonly slug: string;
  readonly listSong: Array<string>;
}
