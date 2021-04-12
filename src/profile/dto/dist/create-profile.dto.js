"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileType = void 0;
var song_dto_1 = require("./../../song/dto/song.dto");
var graphql_1 = require("@nestjs/graphql");
var ProfileType = /** @class */ (function () {
    function ProfileType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], ProfileType.prototype, "id");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "account_id");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "first_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "last_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "email");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "age");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "gender");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "birthday");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "avatarUrl");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileType.prototype, "account_name");
    __decorate([
        graphql_1.Field(function () { return [song_dto_1.SongType]; }, { nullable: true })
    ], ProfileType.prototype, "listLikedSong");
    __decorate([
        graphql_1.Field(function () { return [song_dto_1.SongType]; }, { nullable: true })
    ], ProfileType.prototype, "listFollowings");
    __decorate([
        graphql_1.Field(function () { return [song_dto_1.SongType]; }, { nullable: true })
    ], ProfileType.prototype, "listFollowers");
    ProfileType = __decorate([
        graphql_1.ObjectType()
    ], ProfileType);
    return ProfileType;
}());
exports.ProfileType = ProfileType;
