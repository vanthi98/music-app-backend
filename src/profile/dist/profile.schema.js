"use strict";
exports.__esModule = true;
exports.ProfileSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.ProfileSchema = new mongoose.Schema({
    account_id: String,
    first_name: String,
    last_name: String,
    gender: Boolean,
    age: Number,
    birthday: String,
    account_name: String,
    avatarUrl: String,
    listLikedSong: [{ type: Schema.Types.ObjectId, ref: "Song" }]
});
