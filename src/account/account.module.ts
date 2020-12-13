import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AccountResolver } from "./account.resolver";
import { AccountSchema } from "./account.schema";
import { AccountService } from "./account.service";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Account", schema: AccountSchema }])
  ],
  providers: [AccountService, AccountResolver],
  exports: [AccountService]
})
export class AccountModule {}
