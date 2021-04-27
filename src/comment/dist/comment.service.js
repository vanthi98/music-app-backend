"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.CommentService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var CommentService = /** @class */ (function () {
    function CommentService(commentModel, profileService, songService) {
        this.commentModel = commentModel;
        this.profileService = profileService;
        this.songService = songService;
    }
    CommentService.prototype.createComment = function (email, song_id, parent, input) {
        return __awaiter(this, void 0, Promise, function () {
            var current, profile, id, newComment, result, _id, song, listComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = new Date();
                        return [4 /*yield*/, this.profileService.getProfileByEmail(email)];
                    case 1:
                        profile = _a.sent();
                        id = profile.id;
                        newComment = new this.commentModel(__assign(__assign({}, input), { user: id, song: song_id, parent: parent, like: 0, dislike: 0, createdAt: current, updatedAt: current }));
                        return [4 /*yield*/, newComment.save()];
                    case 2:
                        result = _a.sent();
                        _id = result._id;
                        return [4 /*yield*/, this.songService.findOne(song_id)];
                    case 3:
                        song = _a.sent();
                        listComment = song.listComment;
                        return [4 /*yield*/, this.songService.updateListComment(__spreadArrays(listComment, [new mongoose.mongo.ObjectId(_id)]), song_id)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CommentService.prototype.getCommentsBySong = function (songId) {
        return __awaiter(this, void 0, Promise, function () {
            var song, listComment, result, listCommentLength, i, comment, user, profile, _id, song_1, parent, title, content, like, dislike, createdAt, updatedAt, adapterComment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.songService.findOne(songId)];
                    case 1:
                        song = _a.sent();
                        listComment = song.listComment;
                        result = [];
                        listCommentLength = listComment.length;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listCommentLength)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.commentModel.findById(listComment[i])];
                    case 3:
                        comment = _a.sent();
                        user = comment.user;
                        return [4 /*yield*/, this.profileService.getProfileById(user)];
                    case 4:
                        profile = _a.sent();
                        _id = comment._id, song_1 = comment.song, parent = comment.parent, title = comment.title, content = comment.content, like = comment.like, dislike = comment.dislike, createdAt = comment.createdAt, updatedAt = comment.updatedAt;
                        adapterComment = {
                            _id: _id,
                            song: song_1,
                            parent: parent,
                            title: title,
                            content: content,
                            like: like,
                            dislike: dislike,
                            createdAt: createdAt,
                            updatedAt: updatedAt,
                            user: {
                                account_name: profile.account_name,
                                avatarUrl: profile.avatarUrl
                            }
                        };
                        result.push(adapterComment);
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6:
                        console.log(result);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    CommentService.prototype.likeComment = function (commentId) {
        return __awaiter(this, void 0, Promise, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentModel.findOne(commentId)];
                    case 1:
                        comment = _a.sent();
                        /* @TODO: Update field like to 1 */
                        return [2 /*return*/, comment];
                }
            });
        });
    };
    CommentService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel("Comment"))
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
