import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountResolver } from "./account.resolver";
import { AccountSchema } from "./account.schema";
import { AccountService } from "./account.service";
import { JwtModule } from "@nestjs/jwt";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{ name: "Account", schema: AccountSchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [AccountService, AccountResolver],
  exports: [AccountService]
})
export class AccountModule {}
