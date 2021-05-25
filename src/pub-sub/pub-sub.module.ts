import { Module } from "@nestjs/common";
import { PubSub } from "apollo-server-express";

@Module({
  providers: [
    {
      provide: "PUB_SUB",
      useClass: PubSub
    }
  ],
  exports: ["PUB_SUB"]
})
export class PubSubModule {}
