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
exports.AccountResolver = void 0;
var graphql_1 = require("@nestjs/graphql");
var create_account_dto_1 = require("./dto/create-account.dto");
var common_1 = require("@nestjs/common");
var graphqlAuth_1 = require("../auth/graphqlAuth");
var ctx_account_decorator_1 = require("../auth/decorators/ctx-account.decorator");
var AccountResolver = /** @class */ (function () {
    function AccountResolver(accountService) {
        this.accountService = accountService;
    }
    AccountResolver.prototype.createAccount = function (input) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountService.create(input)];
            });
        });
    };
    AccountResolver.prototype.getAllAccount = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountService.getAll()];
            });
        });
    };
    AccountResolver.prototype.getAccount = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountService.findOne(id)];
            });
        });
    };
    AccountResolver.prototype.getCurrentAccountId = function (user) {
        return __awaiter(this, void 0, Promise, function () {
            var email, account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = user.payload.accountId;
                        return [4 /*yield*/, this.accountService.findByEmail(email)];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account.id];
                }
            });
        });
    };
    AccountResolver.prototype.resetAccount = function (input) {
        return __awaiter(this, void 0, Promise, function () {
            var account;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountService.forgotPassword(input)];
                    case 1:
                        account = _a.sent();
                        return [2 /*return*/, account];
                }
            });
        });
    };
    AccountResolver.prototype.confirmResetPasswordToken = function (token) {
        return __awaiter(this, void 0, Promise, function () {
            var isValidate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountService.confirmForgotPasswordToken(token)];
                    case 1:
                        isValidate = _a.sent();
                        return [2 /*return*/, isValidate];
                }
            });
        });
    };
    AccountResolver.prototype.resetAccountPassword = function (input) {
        return __awaiter(this, void 0, Promise, function () {
            var newPasswordAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountService.resetForgotPassword(input)];
                    case 1:
                        newPasswordAccount = _a.sent();
                        return [2 /*return*/, newPasswordAccount];
                }
            });
        });
    };
    AccountResolver.prototype.deleteResetPasswordToken = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.accountService.deleteResetPasswordToken(email)];
            });
        });
    };
    __decorate([
        graphql_1.Mutation(function () { return create_account_dto_1.AccountType; }),
        __param(0, graphql_1.Args("input"))
    ], AccountResolver.prototype, "createAccount");
    __decorate([
        graphql_1.Query(function () { return [create_account_dto_1.AccountType]; })
    ], AccountResolver.prototype, "getAllAccount");
    __decorate([
        graphql_1.Query(function () { return create_account_dto_1.AccountType; }),
        __param(0, graphql_1.Args("id"))
    ], AccountResolver.prototype, "getAccount");
    __decorate([
        graphql_1.Query(function () { return String; }),
        common_1.UseGuards(graphqlAuth_1.GqlAuthGuard),
        __param(0, ctx_account_decorator_1.CtxUser())
    ], AccountResolver.prototype, "getCurrentAccountId");
    __decorate([
        graphql_1.Mutation(function () { return create_account_dto_1.AccountType; }),
        __param(0, graphql_1.Args("input"))
    ], AccountResolver.prototype, "resetAccount");
    __decorate([
        graphql_1.Mutation(function () { return Boolean; }),
        __param(0, graphql_1.Args("token"))
    ], AccountResolver.prototype, "confirmResetPasswordToken");
    __decorate([
        graphql_1.Mutation(function () { return create_account_dto_1.AccountType; }),
        __param(0, graphql_1.Args("input"))
    ], AccountResolver.prototype, "resetAccountPassword");
    __decorate([
        graphql_1.Mutation(function () { return String; }),
        __param(0, graphql_1.Args("email"))
    ], AccountResolver.prototype, "deleteResetPasswordToken");
    AccountResolver = __decorate([
        graphql_1.Resolver()
    ], AccountResolver);
    return AccountResolver;
}());
exports.AccountResolver = AccountResolver;
