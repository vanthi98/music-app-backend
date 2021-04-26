"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SongUpdateInput = exports.SongInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var SongInput = /** @class */ (function () {
    function SongInput() {
    }
    __decorate([
        graphql_1.Field()
    ], SongInput.prototype, "song_name");
    __decorate([
        graphql_1.Field()
    ], SongInput.prototype, "song_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongInput.prototype, "song_image_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongInput.prototype, "lyric");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongInput.prototype, "author");
    SongInput = __decorate([
        graphql_1.InputType()
    ], SongInput);
    return SongInput;
}());
exports.SongInput = SongInput;
var SongUpdateInput = /** @class */ (function () {
    function SongUpdateInput() {
    }
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongUpdateInput.prototype, "song_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongUpdateInput.prototype, "song_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongUpdateInput.prototype, "song_image_url");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongUpdateInput.prototype, "lyric");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], SongUpdateInput.prototype, "author");
    SongUpdateInput = __decorate([
        graphql_1.InputType()
    ], SongUpdateInput);
    return SongUpdateInput;
}());
exports.SongUpdateInput = SongUpdateInput;
