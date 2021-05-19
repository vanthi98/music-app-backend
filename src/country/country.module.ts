import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CountryService } from "./country.service";
import { CountryResolver } from "./country.resolver";
import { JwtModule } from "@nestjs/jwt";
import { CountrySchema } from "./country.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Country", schema: CountrySchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [CountryService, CountryResolver],
  exports: [CountryService]
})
export class CountryModule {}
