import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { TestService } from './test.service';
import { TestResolver } from './test.resolver';
import {TestSchema} from './test.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Test", schema: TestSchema }])
  ],
  providers: [TestService, TestResolver],
  exports: [TestService]
})
export class TestModule {}
