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
exports.PlaylistService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var PlaylistService = /** @class */ (function () {
    function PlaylistService(playlistModel, songService, profileService) {
        this.playlistModel = playlistModel;
        this.songService = songService;
        this.profileService = profileService;
    }
    PlaylistService.prototype.createPlaylist = function (email, input) {
        return __awaiter(this, void 0, Promise, function () {
            var current, profile, id, newPlaylist, result, _id, listPlaylist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = new Date();
                        return [4 /*yield*/, this.profileService.getProfileByEmail(email)];
                    case 1:
                        profile = _a.sent();
                        id = profile.id;
                        newPlaylist = new this.playlistModel(__assign(__assign({}, input), { user: id, createdAt: current, updatedAt: current }));
                        return [4 /*yield*/, newPlaylist.save()];
                    case 2:
                        result = _a.sent();
                        _id = result._id;
                        listPlaylist = profile.listPlaylist;
                        return [4 /*yield*/, this.profileService.update({ listPlaylist: __spreadArrays(listPlaylist, [new mongoose.mongo.ObjectId(_id)]) }, id)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PlaylistService.prototype.addSongToPlaylist = function (playlist_id, song_id) {
        return __awaiter(this, void 0, Promise, function () {
            var current, playlist, findSong, listSong, listSongLength, i, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = new Date();
                        return [4 /*yield*/, this.playlistModel.findById(playlist_id)];
                    case 1:
                        playlist = _a.sent();
                        return [4 /*yield*/, this.songService.findOne(song_id)];
                    case 2:
                        findSong = _a.sent();
                        if (!findSong) {
                            throw new Error("Bài hát không tồn tại");
                        }
                        listSong = playlist.listSong;
                        listSongLength = listSong.length;
                        for (i = 0; i < listSongLength; i++) {
                            if (listSong[i].toString() === song_id) {
                                throw new Error("Bài hát đã có sẵn trong playlist này");
                            }
                        }
                        return [4 /*yield*/, this.playlistModel.findByIdAndUpdate(playlist_id, {
                                listSong: __spreadArrays(listSong, [new mongoose.mongo.ObjectId(song_id)]),
                                updatedAt: current
                            }, { "new": true })];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    PlaylistService.prototype.removeSongFromPlaylist = function (playlist_id, song_id) {
        return __awaiter(this, void 0, Promise, function () {
            var current, playlist, findSong, listSong, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        current = new Date();
                        return [4 /*yield*/, this.playlistModel.findById(playlist_id)];
                    case 1:
                        playlist = _a.sent();
                        return [4 /*yield*/, this.songService.findOne(song_id)];
                    case 2:
                        findSong = _a.sent();
                        if (!findSong) {
                            throw new Error("Bài hát không tồn tại");
                        }
                        listSong = playlist.listSong;
                        if (!(!listSong || listSong.length === 0)) return [3 /*break*/, 3];
                        throw new Error("Lỗi xảy ra khi xóa bài hát khỏi playlist");
                    case 3:
                        if (!(listSong.indexOf(song_id) > -1)) return [3 /*break*/, 5];
                        temp = listSong;
                        temp.splice(listSong.indexOf(song_id), 1);
                        return [4 /*yield*/, this.playlistModel.findOneAndUpdate({ _id: playlist_id }, {
                                listSong: temp
                            }, { "new": true })];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("This user is not exist in list liked user of this song");
                    case 6: return [2 /*return*/, playlist];
                }
            });
        });
    };
    PlaylistService.prototype.deletePlaylist = function (email, playlist_id) {
        return __awaiter(this, void 0, Promise, function () {
            var result, profile, listPlaylist, id, temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playlistModel.findByIdAndDelete(playlist_id)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("Lỗi xảy ra khi xóa playlist");
                        }
                        return [4 /*yield*/, this.profileService.getProfileByEmail(email)];
                    case 2:
                        profile = _a.sent();
                        listPlaylist = profile.listPlaylist, id = profile.id;
                        if (!(!listPlaylist || listPlaylist.length === 0)) return [3 /*break*/, 3];
                        throw new Error("Danh sách playlist của bạn rỗng");
                    case 3:
                        if (!(listPlaylist.indexOf(playlist_id) > -1)) return [3 /*break*/, 5];
                        temp = listPlaylist;
                        temp.splice(listPlaylist.indexOf(playlist_id), 1);
                        return [4 /*yield*/, this.profileService.update({
                                listPlaylist: temp
                            }, id)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5: throw new Error("Playlist này không có trong danh sách playlist của bạn");
                    case 6: return [2 /*return*/, result._id];
                }
            });
        });
    };
    PlaylistService.prototype.getAllPlaylist = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var profile, listPlaylist, listPlaylistLength, result, i, playlist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getProfileByEmail(email)];
                    case 1:
                        profile = _a.sent();
                        if (!profile) {
                            throw new Error("Không thể tìm thấy profile người dùng");
                        }
                        listPlaylist = profile.listPlaylist;
                        listPlaylistLength = listPlaylist.length;
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listPlaylistLength)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.playlistModel.findById(listPlaylist[i].toString())];
                    case 3:
                        playlist = _a.sent();
                        result.push(playlist);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    PlaylistService.prototype.getSongByPlaylist = function (playlist_id) {
        return __awaiter(this, void 0, Promise, function () {
            var playlist, listSong, listSongLength, result, i, song;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.playlistModel.findById(playlist_id)];
                    case 1:
                        playlist = _a.sent();
                        if (!playlist) {
                            throw new Error("Không thể tìm thấy playlist");
                        }
                        listSong = playlist.listSong;
                        listSongLength = listSong.length;
                        result = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < listSongLength)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.songService.findOne(listSong[i].toString())];
                    case 3:
                        song = _a.sent();
                        if (song)
                            result.push(song);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, result];
                }
            });
        });
    };
    PlaylistService.prototype.getPlaylistById = function (playlist_id) {
        return __awaiter(this, void 0, Promise, function () {
            var playlist, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.playlistModel.findById(playlist_id)];
                    case 1:
                        playlist = _b.sent();
                        return [2 /*return*/, playlist];
                    case 2:
                        _a = _b.sent();
                        throw new Error("Có lỗi xảy ra khi lấy thông tin playlist");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    PlaylistService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel("Playlist"))
    ], PlaylistService);
    return PlaylistService;
}());
exports.PlaylistService = PlaylistService;
