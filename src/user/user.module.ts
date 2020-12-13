import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { UserSchema } from "./user.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: "User", schema: UserSchema }])],
  providers: [UserService, UserResolver]
})
export class UserModule {}
