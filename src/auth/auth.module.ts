import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { AccountModule } from "../account/account.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwtKey";
import { JwtStrategy } from "./jwt.strategy";
import { GqlAuthGuard } from "./graphqlAuth";
import { ProfileModule } from "../profile/profile.module";

@Module({
  imports: [
    AccountModule,
    ProfileModule,
    PassportModule.register({ defaultStrategy: "bearer" }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [
    AuthService,
    AuthResolver,
    LocalStrategy,
    JwtStrategy,
    GqlAuthGuard
  ],
  exports: []
})
export class AuthModule {}
