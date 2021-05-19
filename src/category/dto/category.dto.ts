import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  readonly _id?: string;
  @Field(() => String)
  readonly category_id: string;
  @Field(() => String)
  readonly name: string;
  @Field(() => String)
  readonly slug: string;
  @Field(() => [String], { nullable: true })
  readonly listSong?: Array<string>;
}
