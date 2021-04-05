"use strict";
exports.__esModule = true;
exports.SongSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.SongSchema = new Schema({
    id: { type: Schema.Types.ObjectId, unique: true, require: true },
    song_name: { type: String },
    song_url: String,
    song_image_url: String,
    lyric: String,
    author: String,
    like: Number,
    comment: Number,
    listen: Number,
    share: Number,
    uploader: String,
    duration: Number,
    listLikedUser: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
});
