"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var graphql_1 = require("@nestjs/graphql");
var mongoose_1 = require("@nestjs/mongoose");
var account_module_1 = require("./account/account.module");
var auth_module_1 = require("./auth/auth.module");
var profile_module_1 = require("./profile/profile.module");
var test_module_1 = require("./test/test.module");
var mailer_1 = require("@nestjs-modules/mailer");
var ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
var song_module_1 = require("./song/song.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                graphql_1.GraphQLModule.forRoot({
                    autoSchemaFile: "schema.gql",
                    cors: {
                        credentials: true,
                        origin: true
                    }
                }),
                // MongooseModule.forRoot(
                //   "mongodb+srv://vanthi1211:react19001560@cluster0.qe56j.mongodb.net/music?retryWrites=true&w=majority"
                // ),
                mongoose_1.MongooseModule.forRoot("mongodb://localhost:27017/music"),
                mailer_1.MailerModule.forRoot({
                    transport: {
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: "levanthi.tl14@gmail.com",
                            pass: "react19001560"
                        }
                    },
                    defaults: {
                        from: '"nest-modules" <modules@nestjs.com>'
                    },
                    template: {
                        dir: process.cwd() + "/src/template",
                        adapter: new ejs_adapter_1.EjsAdapter(),
                        options: {
                            strict: false
                        }
                    }
                }),
                account_module_1.AccountModule,
                auth_module_1.AuthModule,
                profile_module_1.ProfileModule,
                song_module_1.SongModule,
                test_module_1.TestModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
