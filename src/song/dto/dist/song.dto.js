"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadSongType = exports.SongType = void 0;
var graphql_1 = require("@nestjs/graphql");
var SongType = /** @class */ (function () {
    function SongType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], SongType.prototype, "_id");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "song_name");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "song_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongType.prototype, "song_image_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongType.prototype, "lyric");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongType.prototype, "author");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "like");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "comment");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "listen");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "share");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "uploader");
    __decorate([
        graphql_1.Field()
    ], SongType.prototype, "duration");
    __decorate([
        graphql_1.Field(function () { return [String]; }, { nullable: true })
    ], SongType.prototype, "listLikedUser");
    SongType = __decorate([
        graphql_1.ObjectType()
    ], SongType);
    return SongType;
}());
exports.SongType = SongType;
var UploadSongType = /** @class */ (function () {
    function UploadSongType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], UploadSongType.prototype, "id");
    UploadSongType = __decorate([
        graphql_1.ObjectType()
    ], UploadSongType);
    return UploadSongType;
}());
exports.UploadSongType = UploadSongType;
