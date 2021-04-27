import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class UserType {
  @Field({ nullable: true })
  readonly account_name: string;
  @Field({ nullable: true })
  readonly avatarUrl: string;
}

@ObjectType()
export class CommentType {
  @Field(() => ID)
  readonly _id: string;
  @Field({ nullable: false })
  readonly user: UserType;
  @Field({ nullable: false })
  readonly song: string;
  @Field({ nullable: true })
  readonly parent?: string;
  @Field({ nullable: false })
  readonly title: string;
  @Field({ nullable: false })
  readonly content: string;
  @Field({ nullable: false })
  readonly like: number;
  @Field({ nullable: false })
  readonly dislike: number;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field({ nullable: true })
  readonly updatedAt?: Date;
}

@ObjectType()
export class CreateCommentType {
  @Field(() => ID)
  readonly _id?: string;
}
