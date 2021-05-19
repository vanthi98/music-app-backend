import { Module } from "@nestjs/common";
import { CategoryResolver } from "./category.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { CategoryService } from "./category.service";
import { JwtModule } from "@nestjs/jwt";
import { CategorySchema } from "./category.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }]),
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: "9000s" }
    })
  ],
  providers: [CategoryResolver, CategoryService],
  exports: [CategoryService]
})
export class CategoryModule {}
