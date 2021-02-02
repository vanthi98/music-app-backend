import { Document } from "mongoose";

export interface Profile extends Document {
  readonly account_id?: string;
  readonly first_name?: string;
  readonly last_name?: string;
  readonly email?: string;
  readonly age?: number;
  readonly gender?: boolean;
  readonly birthday?: string;
  readonly avatarUrl?: string;
}
