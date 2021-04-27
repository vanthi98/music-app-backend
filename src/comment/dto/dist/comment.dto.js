"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateCommentType = exports.CommentType = exports.UserType = void 0;
var graphql_1 = require("@nestjs/graphql");
var UserType = /** @class */ (function () {
    function UserType() {
    }
    __decorate([
        graphql_1.Field({ nullable: true })
    ], UserType.prototype, "account_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], UserType.prototype, "avatarUrl");
    UserType = __decorate([
        graphql_1.ObjectType()
    ], UserType);
    return UserType;
}());
exports.UserType = UserType;
var CommentType = /** @class */ (function () {
    function CommentType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], CommentType.prototype, "_id");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "user");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "song");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], CommentType.prototype, "parent");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "title");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "content");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "like");
    __decorate([
        graphql_1.Field({ nullable: false })
    ], CommentType.prototype, "dislike");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], CommentType.prototype, "createdAt");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], CommentType.prototype, "updatedAt");
    CommentType = __decorate([
        graphql_1.ObjectType()
    ], CommentType);
    return CommentType;
}());
exports.CommentType = CommentType;
var CreateCommentType = /** @class */ (function () {
    function CreateCommentType() {
    }
    __decorate([
        graphql_1.Field(function () { return graphql_1.ID; })
    ], CreateCommentType.prototype, "_id");
    CreateCommentType = __decorate([
        graphql_1.ObjectType()
    ], CreateCommentType);
    return CreateCommentType;
}());
exports.CreateCommentType = CreateCommentType;
