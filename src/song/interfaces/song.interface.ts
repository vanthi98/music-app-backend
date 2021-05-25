import { Document } from "mongoose";
export interface Song extends Document {
  readonly id?: string;
  readonly song_name: string;
  readonly song_url: string;
  readonly song_image_url?: string;
  readonly lyric?: string;
  readonly author?: string;
  readonly like: number;
  readonly comment: number;
  readonly listen: number;
  readonly share: number;
  readonly uploader_id: string;
  readonly duration?: number;
  readonly listLikedUser?: Array<string>;
  readonly listComment?: Array<string>;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly country: number;
  readonly category: string;
}
