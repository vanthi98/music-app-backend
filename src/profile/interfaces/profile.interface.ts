import { Document } from "mongoose";

export interface Profile extends Document {
  readonly account_id?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly account_name?: string;
  readonly age?: number;
  readonly gender?: boolean;
  readonly birthday?: string;
  readonly avatarUrl?: string;
  readonly listLikedSong?: Array<any>;
  readonly listFollowers?: Array<any>;
  readonly listFollowings?: Array<any>;
}
