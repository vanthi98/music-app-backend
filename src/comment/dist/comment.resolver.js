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
exports.CommentResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var comment_dto_1 = require("./dto/comment.dto");
var common_1 = require("@nestjs/common");
var graphqlAuth_1 = require("../auth/graphqlAuth");
var ctx_account_decorator_1 = require("../auth/decorators/ctx-account.decorator");
var CommentResolver = /** @class */ (function () {
    function CommentResolver(commentService) {
        this.commentService = commentService;
    }
    CommentResolver.prototype.createComment = function (currentUser, song_id, parent_id, input) {
        return __awaiter(this, void 0, Promise, function () {
            var email;
            return __generator(this, function (_a) {
                email = currentUser.payload.accountId;
                return [2 /*return*/, this.commentService.createComment(email, song_id, parent_id, input)];
            });
        });
    };
    CommentResolver.prototype.getCommentBySong = function (song_id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.commentService.getCommentsBySong(song_id)];
            });
        });
    };
    __decorate([
        graphql_1.Mutation(function () { return comment_dto_1.CreateCommentType; }),
        common_1.UseGuards(graphqlAuth_1.GqlAuthGuard),
        __param(0, ctx_account_decorator_1.CtxUser()),
        __param(1, graphql_1.Args("song_id")),
        __param(2, graphql_1.Args("parent_id", { nullable: true, type: function () { return String; } })),
        __param(3, graphql_1.Args("input"))
    ], CommentResolver.prototype, "createComment");
    __decorate([
        graphql_1.Query(function () { return [comment_dto_1.CommentType]; }),
        __param(0, graphql_1.Args("song_id"))
    ], CommentResolver.prototype, "getCommentBySong");
    CommentResolver = __decorate([
        graphql_1.Resolver()
    ], CommentResolver);
    return CommentResolver;
}());
exports.CommentResolver = CommentResolver;
