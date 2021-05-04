"use strict";
exports.__esModule = true;
exports.CommentSchema = void 0;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
exports.CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Profile" },
    song: { type: Schema.Types.ObjectId, ref: "Song" },
    parent: { type: Schema.Types.ObjectId, ref: "Comment" },
    title: String,
    content: String,
    like: Number,
    dislike: Number,
    createdAt: Date,
    updatedAt: Date,
    listLike: [{ type: Schema.Types.ObjectId, ref: "Profile" }],
    listDislike: [{ type: Schema.Types.ObjectId, ref: "Profile" }]
});
