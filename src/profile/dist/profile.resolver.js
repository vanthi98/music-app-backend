"use strict";
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
exports.__esModule = true;
exports.ProfileResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var create_profile_dto_1 = require("./dto/create-profile.dto");
var common_1 = require("@nestjs/common");
var graphqlAuth_1 = require("../auth/graphqlAuth");
var ctx_account_decorator_1 = require("../auth/decorators/ctx-account.decorator");
var ProfileResolver = /** @class */ (function () {
    function ProfileResolver(profileService) {
        this.profileService = profileService;
    }
    ProfileResolver.prototype.updateProfile = function (id, input) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.update(input, id)];
            });
        });
    };
    ProfileResolver.prototype.getProfile = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.getProfileById(id)];
            });
        });
    };
    ProfileResolver.prototype.getProfileByAccountId = function (account_id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.getProfileByAccountId(account_id)];
            });
        });
    };
    ProfileResolver.prototype.getProfileByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.getProfileByEmail(email)];
            });
        });
    };
    ProfileResolver.prototype.followUser = function (currentUser, follow_id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.follow(currentUser, follow_id)];
            });
        });
    };
    ProfileResolver.prototype.unFollowUser = function (currentUser, follow_id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.unFollow(currentUser, follow_id)];
            });
        });
    };
    ProfileResolver.prototype.checkFollow = function (currentUser, follow_id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.profileService.checkFollow(currentUser, follow_id)];
            });
        });
    };
    __decorate([
        graphql_1.Mutation(function () { return create_profile_dto_1.ProfileType; }),
        __param(0, graphql_1.Args("id")),
        __param(1, graphql_1.Args("input"))
    ], ProfileResolver.prototype, "updateProfile");
    __decorate([
        graphql_1.Query(function () { return create_profile_dto_1.ProfileType; }),
        __param(0, graphql_1.Args("id"))
    ], ProfileResolver.prototype, "getProfile");
    __decorate([
        graphql_1.Query(function () { return create_profile_dto_1.ProfileType; }),
        __param(0, graphql_1.Args("account_id"))
    ], ProfileResolver.prototype, "getProfileByAccountId");
    __decorate([
        graphql_1.Query(function () { return create_profile_dto_1.ProfileType; }),
        __param(0, graphql_1.Args("email"))
    ], ProfileResolver.prototype, "getProfileByEmail");
    __decorate([
        graphql_1.Mutation(function () { return String; }),
        common_1.UseGuards(graphqlAuth_1.GqlAuthGuard),
        __param(0, ctx_account_decorator_1.CtxUser()),
        __param(1, graphql_1.Args("follow_id"))
    ], ProfileResolver.prototype, "followUser");
    __decorate([
        graphql_1.Mutation(function () { return String; }),
        common_1.UseGuards(graphqlAuth_1.GqlAuthGuard),
        __param(0, ctx_account_decorator_1.CtxUser()),
        __param(1, graphql_1.Args("follow_id"))
    ], ProfileResolver.prototype, "unFollowUser");
    __decorate([
        graphql_1.Query(function () { return String; }),
        common_1.UseGuards(graphqlAuth_1.GqlAuthGuard),
        __param(0, ctx_account_decorator_1.CtxUser()),
        __param(1, graphql_1.Args("follow_id"))
    ], ProfileResolver.prototype, "checkFollow");
    ProfileResolver = __decorate([
        graphql_1.Resolver()
    ], ProfileResolver);
    return ProfileResolver;
}());
exports.ProfileResolver = ProfileResolver;
