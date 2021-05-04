"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaylistModule = void 0;
var playlist_schema_1 = require("./playlist.schema");
var playlist_resolver_1 = require("./playlist.resolver");
var mongoose_1 = require("@nestjs/mongoose");
var common_1 = require("@nestjs/common");
var playlist_service_1 = require("./playlist.service");
var jwt_1 = require("@nestjs/jwt");
var song_module_1 = require("../song/song.module");
var profile_module_1 = require("../profile/profile.module");
var PlaylistModule = /** @class */ (function () {
    function PlaylistModule() {
    }
    PlaylistModule = __decorate([
        common_1.Module({
            imports: [
                song_module_1.SongModule,
                profile_module_1.ProfileModule,
                mongoose_1.MongooseModule.forFeature([{ name: "Playlist", schema: playlist_schema_1.PlaylistSchema }]),
                jwt_1.JwtModule.register({
                    secret: "secretKey",
                    signOptions: { expiresIn: "9000s" }
                })
            ],
            providers: [playlist_resolver_1.PlaylistResolver, playlist_service_1.PlaylistService],
            exports: [playlist_service_1.PlaylistService]
        })
    ], PlaylistModule);
    return PlaylistModule;
}());
exports.PlaylistModule = PlaylistModule;
