import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class NotificationType {
  @Field(() => ID)
  readonly _id?: string;
  @Field({ nullable: true })
  readonly thumbnail: string;
  @Field()
  readonly notice_id: string;
  @Field()
  readonly title?: string;
  @Field()
  readonly description?: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field()
  readonly type: string;
  @Field()
  readonly status: string;
  @Field()
  readonly user: string;
}

@ObjectType()
export class CreateNotificationType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly user?: string;
}
