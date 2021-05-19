import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class NotificationInput {
  @Field({ nullable: false })
  readonly title: string;
  @Field({ nullable: false })
  readonly description: string;
  @Field({ nullable: false })
  readonly type: string;
  @Field({ nullable: false })
  readonly status: string;
}
