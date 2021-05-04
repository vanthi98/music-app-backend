"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePlaylistType = exports.PlaylistType = void 0;
var graphql_1 = require("@nestjs/graphql");
var PlaylistType = /** @class */ (function () {
    function PlaylistType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], PlaylistType.prototype, "_id");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], PlaylistType.prototype, "user");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], PlaylistType.prototype, "name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], PlaylistType.prototype, "notes");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], PlaylistType.prototype, "createdAt");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], PlaylistType.prototype, "updatedAt");
    __decorate([
        graphql_1.Field(function () { return [String]; }, { nullable: true })
    ], PlaylistType.prototype, "listSong");
    PlaylistType = __decorate([
        graphql_1.ObjectType()
    ], PlaylistType);
    return PlaylistType;
}());
exports.PlaylistType = PlaylistType;
var CreatePlaylistType = /** @class */ (function () {
    function CreatePlaylistType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], CreatePlaylistType.prototype, "_id");
    CreatePlaylistType = __decorate([
        graphql_1.ObjectType()
    ], CreatePlaylistType);
    return CreatePlaylistType;
}());
exports.CreatePlaylistType = CreatePlaylistType;
