import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountModule } from "./account/account.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileService } from "./profile/profile.service";
import { ProfileModule } from "./profile/profile.module";

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
    AccountModule,
    AuthModule,
    ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
