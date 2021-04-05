"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SongModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var song_resolver_1 = require("./song.resolver");
var song_schema_1 = require("./song.schema");
var song_service_1 = require("./song.service");
var jwt_1 = require("@nestjs/jwt");
var profile_module_1 = require("../profile/profile.module");
var account_module_1 = require("../account/account.module");
var SongModule = /** @class */ (function () {
    function SongModule() {
    }
    SongModule = __decorate([
        common_1.Module({
            imports: [
                profile_module_1.ProfileModule,
                account_module_1.AccountModule,
                mongoose_1.MongooseModule.forFeature([{ name: "Song", schema: song_schema_1.SongSchema }]),
                jwt_1.JwtModule.register({
                    secret: "secretKey",
                    signOptions: { expiresIn: "9000s" }
                })
            ],
            providers: [song_resolver_1.SongResolver, song_service_1.SongService],
            exports: [song_service_1.SongService]
        })
    ], SongModule);
    return SongModule;
}());
exports.SongModule = SongModule;
