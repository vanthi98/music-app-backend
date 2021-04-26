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
exports.AccountService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var auth_helpers_1 = require("../auth/helpers/auth.helpers");
var profile_service_1 = require("../profile/profile.service");
var makeid = function (length) { return __awaiter(void 0, void 0, void 0, function () {
    var result, characters, charactersLength, i;
    return __generator(this, function (_a) {
        result = "";
        characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        charactersLength = characters.length;
        for (i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return [2 /*return*/, result];
    });
}); };
console.log(makeid(5));
var AccountService = /** @class */ (function () {
    function AccountService(accountModel, profileService, mailerService) {
        this.accountModel = accountModel;
        this.profileService = profileService;
        this.mailerService = mailerService;
    }
    AccountService.prototype.create = function (createAccountDto) {
        return __awaiter(this, void 0, Promise, function () {
            var found, password, createAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByEmail(createAccountDto.email)];
                    case 1:
                        found = _a.sent();
                        if (found) {
                            throw new common_1.BadRequestException("T\u00E0i kho\u1EA3n " + createAccountDto.email + " \u0111\u00E3 t\u1ED3n t\u1EA1i");
                        }
                        return [4 /*yield*/, auth_helpers_1.AuthHelper.hash(createAccountDto.password)];
                    case 2:
                        password = _a.sent();
                        createAccount = new this.accountModel({
                            email: createAccountDto.email,
                            password: password
                        });
                        return [4 /*yield*/, this.profileService.create(createAccount._id, createAccountDto)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, createAccount.save()];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountModel.findOne({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AccountService.prototype.findByAccountName = function (account_name) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountModel.findOne({ account_name: account_name })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AccountService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountModel.findOne({ email: email })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AccountService.prototype.findByResetPasswordToken = function (token) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountModel.findOne({
                            resetPasswordToken: token
                        })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AccountService.prototype.getAll = function () {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.accountModel.find({})];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AccountService.prototype.forgotPassword = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var found, token, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByEmail(email)];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.BadRequestException("Email " + email + " kh\u00F4ng t\u1ED3n t\u1EA1i");
                        }
                        return [4 /*yield*/, makeid(20)];
                    case 2:
                        token = _a.sent();
                        console.log(token);
                        return [4 /*yield*/, this.accountModel.findOneAndUpdate({ _id: found.id }, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 900000 }, { upsert: true, "new": true })];
                    case 3:
                        result = _a.sent();
                        this.mailerService
                            .sendMail({
                            to: email,
                            from: "noreply@nestjs.com",
                            subject: "Testing Nest MailerModule ✔",
                            template: "index",
                            context: {
                                code: token,
                                username: "Văn Thi"
                            }
                        })
                            .then(function (result) {
                            console.log(result);
                        })["catch"](function (error) {
                            console.log(error);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    AccountService.prototype.confirmForgotPasswordToken = function (token) {
        return __awaiter(this, void 0, Promise, function () {
            var found, resetPasswordExpires;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByResetPasswordToken(token)];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.BadRequestException("Token kh\u00F4ng ch\u00EDnh x\u00E1c, vui l\u00F2ng nh\u1EADp l\u1EA1i");
                        }
                        resetPasswordExpires = found.resetPasswordExpires;
                        if (resetPasswordExpires < Date.now()) {
                            throw new common_1.BadRequestException("Token \u0111\u00E3 h\u1EBFt h\u1EA1n, vui l\u00F2ng y\u00EAu c\u1EA7u 1 token m\u1EDBi");
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    AccountService.prototype.resetForgotPassword = function (input) {
        return __awaiter(this, void 0, Promise, function () {
            var token, password, found, resetPasswordExpires, hasedPassword, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = input.token, password = input.password;
                        return [4 /*yield*/, this.findByResetPasswordToken(token)];
                    case 1:
                        found = _a.sent();
                        if (!found) {
                            throw new common_1.BadRequestException("Token kh\u00F4ng ch\u00EDnh x\u00E1c, vui l\u00F2ng nh\u1EADp l\u1EA1i");
                        }
                        resetPasswordExpires = found.resetPasswordExpires;
                        if (resetPasswordExpires < Date.now()) {
                            throw new common_1.BadRequestException("Token \u0111\u00E3 h\u1EBFt h\u1EA1n, vui l\u00F2ng y\u00EAu c\u1EA7u 1 token m\u1EDBi");
                        }
                        return [4 /*yield*/, auth_helpers_1.AuthHelper.hash(password)];
                    case 2:
                        hasedPassword = _a.sent();
                        return [4 /*yield*/, this.accountModel.findOneAndUpdate({ resetPasswordToken: token }, {
                                resetPasswordToken: undefined,
                                resetPasswordExpires: undefined,
                                password: hasedPassword
                            }, { upsert: true, "new": true })];
                    case 3:
                        result = _a.sent();
                        if (result)
                            return [2 /*return*/, result];
                        return [2 /*return*/];
                }
            });
        });
    };
    AccountService.prototype.deleteResetPasswordToken = function (email) {
        return __awaiter(this, void 0, Promise, function () {
            var deleteToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.accountModel.findOneAndUpdate({ email: email }, {
                                resetPasswordToken: undefined,
                                resetPasswordExpires: undefined
                            }, { upsert: true, "new": true })];
                    case 1:
                        deleteToken = _a.sent();
                        return [2 /*return*/, deleteToken.email];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject("Error occur when delete token")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AccountService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel("Account")),
        __param(1, common_1.Inject(common_1.forwardRef(function () { return profile_service_1.ProfileService; })))
    ], AccountService);
    return AccountService;
}());
exports.AccountService = AccountService;
