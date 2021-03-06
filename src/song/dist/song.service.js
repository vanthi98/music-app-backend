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
exports.SongService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var SongService = /** @class */ (function () {
    function SongService(songModel, profileService, accountService) {
        this.songModel = songModel;
        this.profileService = profileService;
        this.accountService = accountService;
    }
    SongService.prototype.uploadSong = function (account_id, input) {
        return __awaiter(this, void 0, Promise, function () {
            var lyric, song_url, newSong;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lyric = input.lyric, song_url = input.song_url;
                        newSong = new this.songModel(__assign(__assign({}, input), { lyric: lyric ? lyric : "", like: 0, comment: 0, share: 0, listen: 0, uploader: account_id }));
                        return [4 /*yield*/, newSong.save()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SongService.prototype.getAllSong = function (keyword) {
        return __awaiter(this, void 0, Promise, function () {
            var regex, listSong, listSong;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!keyword) return [3 /*break*/, 2];
                        regex = /()()/;
                        return [4 /*yield*/, this.songModel.find({
                                song_name: { $regex: new RegExp(keyword, "i") }
                            })];
                    case 1:
                        listSong = _a.sent();
                        return [2 /*return*/, listSong];
                    case 2: return [4 /*yield*/, this.songModel.find({})];
                    case 3:
                        listSong = _a.sent();
                        return [2 /*return*/, listSong];
                }
            });
        });
    };
    SongService.prototype.update = function (songDto, songId) {
        return __awaiter(this, void 0, Promise, function () {
            var updateSong;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.songModel.findByIdAndUpdate(songId, songDto, {
                            "new": true
                        })];
                    case 1:
                        updateSong = _a.sent();
                        return [4 /*yield*/, updateSong];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SongService.prototype.updateSong = function (email, songId, songDto) {
        return __awaiter(this, void 0, Promise, function () {
            var updateSong;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.songModel.findByIdAndUpdate(songId, songDto, {
                            "new": true
                        })];
                    case 1:
                        updateSong = _a.sent();
                        return [4 /*yield*/, updateSong];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SongService.prototype.getUploadedSong = function (account_name) {
        return __awaiter(this, void 0, Promise, function () {
            var accountId, listSongByAccountName;
            return __generator(this, function (_a) {
                accountId = account_name.payload.accountId;
                listSongByAccountName = this.songModel.find({
                    uploader: accountId
                });
                return [2 /*return*/, listSongByAccountName];
            });
        });
    };
    SongService.prototype.getUploadedSongByAccount = function (account_email) {
        return __awaiter(this, void 0, Promise, function () {
            var listSongByAccountName;
            return __generator(this, function (_a) {
                try {
                    listSongByAccountName = this.songModel.find({
                        uploader: account_email
                    });
                    return [2 /*return*/, listSongByAccountName];
                }
                catch (error) {
                    throw new Error(error);
                }
                return [2 /*return*/];
            });
        });
    };
    SongService.prototype.ListenSong = function (email, song_id) {
        return __awaiter(this, void 0, Promise, function () {
            var profile, listHistory, isInHistory, maxOrder, temp, increaseListen, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        return [4 /*yield*/, this.profileService.getProfileByEmailWithLikedSong(email)];
                    case 1:
                        profile = _a.sent();
                        listHistory = profile.listHistory;
                        if (!(!listHistory || listHistory.length === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.profileService.update({
                                listHistory: __spreadArrays(listHistory, [
                                    { song_id: new mongoose.mongo.ObjectId(song_id), order: 1 }
                                ])
                            }, profile.id)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 3:
                        isInHistory = listHistory.filter(function (song) {
                            return song.song_id.toString() === song_id;
                        }).length > 0;
                        maxOrder = Math.max.apply(Math, listHistory.map(function (song) {
                            return song.order;
                        }));
                        if (!isInHistory) return [3 /*break*/, 6];
                        temp = listHistory.filter(function (song) { return song.song_id.toString() !== song_id; });
                        return [4 /*yield*/, this.profileService.update({
                                listHistory: temp
                            }, profile.id)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.profileService.update({
                                listHistory: __spreadArrays(temp, [
                                    {
                                        song_id: new mongoose.mongo.ObjectId(song_id),
                                        order: maxOrder + 1
                                    }
                                ])
                            }, profile.id)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, this.profileService.update({
                            listHistory: __spreadArrays(listHistory, [
                                {
                                    song_id: new mongoose.mongo.ObjectId(song_id),
                                    order: maxOrder + 1
                                }
                            ])
                        }, profile.id)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [4 /*yield*/, this.songModel
                            .findByIdAndUpdate(song_id, { $inc: { listen: 1 } }, { "new": true })
                            .exec()];
                    case 9:
                        increaseListen = _a.sent();
                        console.log(increaseListen);
                        return [2 /*return*/, increaseListen.listen];
                    case 10:
                        error_1 = _a.sent();
                        throw new Error("Cant not listen song" + error_1);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    SongService.prototype.likeSong = function (song_id, currentUser) {
        return __awaiter(this, void 0, Promise, function () {
            var song, uploader, user, account_id, profile, listLikedSong, listLikedUser, increaseLike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.songModel.findOne({ _id: song_id })];
                    case 1:
                        song = _a.sent();
                        if (!song) {
                            throw new Error("Cant find song");
                        }
                        uploader = song.uploader;
                        if (!(uploader === currentUser.payload.accountId)) return [3 /*break*/, 2];
                        throw new Error("You can not like the song what you uploaded");
                    case 2: return [4 /*yield*/, this.accountService.findByEmail(currentUser.payload.accountId)];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Cant find user");
                        }
                        account_id = user.id;
                        return [4 /*yield*/, this.profileService.getProfileByAccountId(account_id)];
                    case 4:
                        profile = _a.sent();
                        listLikedSong = profile.listLikedSong;
                        if (!(!listLikedSong || listLikedSong.length === 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.profileService.update({
                                listLikedSong: __spreadArrays(listLikedSong, [
                                    new mongoose.mongo.ObjectId(song_id)
                                ])
                            }, profile.id)];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(listLikedSong.indexOf(song_id) > -1)) return [3 /*break*/, 7];
                        throw new Error("This song is exist in your liked list");
                    case 7: return [4 /*yield*/, this.profileService.update({
                            listLikedSong: __spreadArrays(listLikedSong, [
                                new mongoose.mongo.ObjectId(song_id)
                            ])
                        }, profile.id)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        listLikedUser = song.listLikedUser;
                        if (!(!listLikedUser || listLikedUser.length === 0)) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.songModel.findOneAndUpdate({ _id: song_id }, {
                                listLikedUser: __spreadArrays(listLikedUser, [
                                    new mongoose.mongo.ObjectId(profile.id)
                                ])
                            }, { "new": true })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 11:
                        if (!(listLikedUser.indexOf(profile.id) > -1)) return [3 /*break*/, 12];
                        throw new Error("This song is exist in your liked list");
                    case 12: return [4 /*yield*/, this.songModel.findOneAndUpdate({ _id: song_id }, {
                            listLikedUser: __spreadArrays(listLikedUser, [
                                new mongoose.mongo.ObjectId(profile.id)
                            ])
                        }, { "new": true })];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [4 /*yield*/, this.songModel
                            .findOneAndUpdate({ _id: song_id }, { $inc: { like: 1 } }, { "new": true })
                            .exec()];
                    case 15:
                        increaseLike = _a.sent();
                        if (!increaseLike) {
                            throw new Error("Have a error when like song");
                        }
                        _a.label = 16;
                    case 16: return [2 /*return*/, song.like];
                }
            });
        });
    };
    SongService.prototype.unlikeSong = function (song_id, currentUser) {
        return __awaiter(this, void 0, Promise, function () {
            var song, uploader, user, account_id, profile, listLikedSong, temp, listLikedUser, temp, decreaseLike;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.songModel.findOne({ _id: song_id })];
                    case 1:
                        song = _a.sent();
                        if (!song) {
                            throw new Error("Cant find song");
                        }
                        uploader = song.uploader;
                        if (!(uploader === currentUser.payload.accountId)) return [3 /*break*/, 2];
                        throw new Error("You can not like the song what you uploaded");
                    case 2: return [4 /*yield*/, this.accountService.findByEmail(currentUser.payload.accountId)];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Cant find user");
                        }
                        account_id = user.id;
                        return [4 /*yield*/, this.profileService.getProfileByAccountId(account_id)];
                    case 4:
                        profile = _a.sent();
                        listLikedSong = profile.listLikedSong;
                        if (!(!listLikedSong || listLikedSong.length === 0)) return [3 /*break*/, 5];
                        throw new Error("Error occur when unlike song");
                    case 5:
                        if (!(listLikedSong.indexOf(song_id) > -1)) return [3 /*break*/, 7];
                        temp = listLikedSong;
                        temp.splice(listLikedSong.indexOf(song_id), 1);
                        return [4 /*yield*/, this.profileService.update({
                                listLikedSong: temp
                            }, profile.id)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 7: throw new Error("This song is not exist in your liked list");
                    case 8:
                        listLikedUser = song.listLikedUser;
                        if (!(!listLikedUser || listLikedUser.length === 0)) return [3 /*break*/, 9];
                        throw new Error("Error occur when unlike song");
                    case 9:
                        if (!(listLikedUser.indexOf(profile.id) > -1)) return [3 /*break*/, 11];
                        temp = listLikedUser;
                        temp.splice(listLikedUser.indexOf(song_id), 1);
                        return [4 /*yield*/, this.songModel.findOneAndUpdate({ _id: song_id }, {
                                listLikedUser: temp
                            }, { "new": true })];
                    case 10:
                        _a.sent();
                        return [3 /*break*/, 12];
                    case 11: throw new Error("This user is not exist in list liked user of this song");
                    case 12: return [4 /*yield*/, this.songModel
                            .findOneAndUpdate({ _id: song_id }, { $inc: { like: -1 } }, { "new": true })
                            .exec()];
                    case 13:
                        decreaseLike = _a.sent();
                        if (!decreaseLike) {
                            throw new Error("Have a error when unlike song");
                        }
                        _a.label = 14;
                    case 14: return [2 /*return*/, song.like];
                }
            });
        });
    };
    SongService.prototype.getLikedSong = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var profile, listLikedSong, length, listSong, i, song;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getProfileByEmailWithLikedSong(email)];
                    case 1:
                        profile = _a.sent();
                        listLikedSong = profile.listLikedSong;
                        length = listLikedSong.length;
                        listSong = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.songModel.findById(listLikedSong[i]).exec()];
                    case 3:
                        song = _a.sent();
                        listSong.push(song);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, listSong];
                }
            });
        });
    };
    SongService.prototype.getHistory = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var profile, listHistory, length, listSong, i, song;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.profileService.getProfileByEmailWithLikedSong(email)];
                    case 1:
                        profile = _a.sent();
                        listHistory = profile.listHistory;
                        listHistory.sort(function (a, b) {
                            if (a.order < b.order)
                                return 1;
                            if (a.order > b.order)
                                return -1;
                            return 0;
                        });
                        length = listHistory.length;
                        listSong = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.songModel.findById(listHistory[i].song_id).exec()];
                    case 3:
                        song = _a.sent();
                        listSong.push(song);
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, listSong];
                }
            });
        });
    };
    SongService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel("Song"))
    ], SongService);
    return SongService;
}());
exports.SongService = SongService;
