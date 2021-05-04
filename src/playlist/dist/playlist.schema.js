"use strict";
exports.__esModule = true;
exports.PlaylistSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.PlaylistSchema = new Schema({
    listSong: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    user: { type: Schema.Types.ObjectId, ref: "Profile" },
    name: String,
    notes: String,
    createdAt: Date,
    updatedAt: Date
});
