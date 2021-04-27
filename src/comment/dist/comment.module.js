"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var comment_resolver_1 = require("./comment.resolver");
var comment_schema_1 = require("./comment.schema");
var comment_service_1 = require("./comment.service");
var jwt_1 = require("@nestjs/jwt");
var profile_module_1 = require("../profile/profile.module");
var song_module_1 = require("../song/song.module");
var CommentModule = /** @class */ (function () {
    function CommentModule() {
    }
    CommentModule = __decorate([
        common_1.Module({
            imports: [
                profile_module_1.ProfileModule,
                song_module_1.SongModule,
                mongoose_1.MongooseModule.forFeature([{ name: "Comment", schema: comment_schema_1.CommentSchema }]),
                jwt_1.JwtModule.register({
                    secret: "secretKey",
                    signOptions: { expiresIn: "9000s" }
                })
            ],
            providers: [comment_resolver_1.CommentResolver, comment_service_1.CommentService],
            exports: [comment_service_1.CommentService]
        })
    ], CommentModule);
    return CommentModule;
}());
exports.CommentModule = CommentModule;
