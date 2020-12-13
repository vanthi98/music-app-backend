import { Document } from "mongoose";

export interface Account extends Document {
  readonly account_name: string;
  readonly password: string;
}
