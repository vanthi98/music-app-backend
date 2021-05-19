import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const CategorySchema = new Schema({
  category_id: Number,
  name: String,
  slug: String,
  listSong: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});
