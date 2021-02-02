import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      cors: {
        credentials: true,
        origin: true
      }
    }),
    MongooseModule.forRoot("mongodb://localhost/music"),
    MailerModule.forRoot({
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
      }
      // template: {
      //   dir: __dirname + "/templates",
      //   adapter: new EjsAdapter(),
      //   options: {
      //     strict: true
      //   }
      // }
    }),
    AccountModule,
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
