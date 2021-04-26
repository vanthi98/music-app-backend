"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileInput = void 0;
var graphql_1 = require("@nestjs/graphql");
var ProfileInput = /** @class */ (function () {
    function ProfileInput() {
    }
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "account_id");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "first_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "last_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "email");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "account_name");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "age");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "gender");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "birthday");
    __decorate([
        graphql_1.Field({ nullable: true })
    ], ProfileInput.prototype, "avatarUrl");
    ProfileInput = __decorate([
        graphql_1.InputType()
    ], ProfileInput);
    return ProfileInput;
}());
exports.ProfileInput = ProfileInput;
