import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { TestModule } from "./test/test.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { SongModule } from "./song/song.module";
import { CommentModule } from "./comment/comment.module";
import { PlaylistModule } from "./playlist/playlist.module";
import { CategoryModule } from "./category/category.module";
import { CountryModule } from "./country/country.module";
import { NotificationModule } from "./notification/notification.module";

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: "schema.gql",
      cors: {
        credentials: true,
        origin: true
      }
    }),
    // MongooseModule.forRoot(
    //   "mongodb+srv://vanthi1211:react19001560@cluster0.qe56j.mongodb.net/music?retryWrites=true&w=majority"
    // ),
    MongooseModule.forRoot("mongodb://mongodb:27017/music"),
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
      },
      template: {
        dir: process.cwd() + "/src/template",
        adapter: new EjsAdapter(),
        options: {
          strict: false
        }
      }
    }),
    AccountModule,
    AuthModule,
    ProfileModule,
    SongModule,
    TestModule,
    CommentModule,
    PlaylistModule,
    CategoryModule,
    CountryModule,
    NotificationModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
