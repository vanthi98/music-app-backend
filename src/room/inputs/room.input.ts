import { InputType, Field } from "@nestjs/graphql";
import { ArrayMinSize } from "class-validator";

@InputType()
export class RoomInput {
  @Field({ nullable: false })
  readonly type: string;
}
