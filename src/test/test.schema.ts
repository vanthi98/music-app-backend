import { Int } from "@nestjs/graphql";
import * as mongoose from "mongoose";

export const TestSchema = new mongoose.Schema({
  title: String,
});
