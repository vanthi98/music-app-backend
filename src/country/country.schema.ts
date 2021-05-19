import * as mongoose from "mongoose";
const { Schema } = mongoose;

export const CountrySchema = new Schema({
  id: { type: Schema.Types.ObjectId, unique: true, require: true },
  country_id: Number,
  name: String,
  slug: String,
  listSong: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});
