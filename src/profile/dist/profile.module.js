"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var profile_resolver_1 = require("./profile.resolver");
var profile_schema_1 = require("./profile.schema");
var profile_service_1 = require("./profile.service");
var jwt_1 = require("@nestjs/jwt");
var account_module_1 = require("../account/account.module");
var common_2 = require("@nestjs/common");
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        common_1.Module({
            imports: [
                common_2.forwardRef(function () { return account_module_1.AccountModule; }),
                mongoose_1.MongooseModule.forFeature([{ name: "Profile", schema: profile_schema_1.ProfileSchema }]),
                jwt_1.JwtModule.register({
                    secret: "secretKey",
                    signOptions: { expiresIn: "9000s" }
                })
            ],
            providers: [profile_resolver_1.ProfileResolver, profile_service_1.ProfileService],
            exports: [profile_service_1.ProfileService]
        })
    ], ProfileModule);
    return ProfileModule;
}());
exports.ProfileModule = ProfileModule;
