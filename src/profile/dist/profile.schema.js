"use strict";
exports.__esModule = true;
exports.ProfileSchema = exports.History = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.History = new mongoose.Schema({
    song_id: { type: Schema.Types.ObjectId, ref: "Song" },
    order: Number
});
exports.ProfileSchema = new mongoose.Schema({
    account_id: String,
    first_name: String,
    last_name: String,
    gender: Boolean,
    age: Number,
    birthday: String,
    account_name: String,
    avatarUrl: String,
    listLikedSong: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    listFollowers: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    listFollowings: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    listHistory: [exports.History],
    listPlaylist: [{ type: Schema.Types.ObjectId, ref: "Playlist" }]
});
