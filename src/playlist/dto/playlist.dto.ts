import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType()
export class PlaylistType {
  @Field(() => ID)
  readonly _id: string;
  @Field({ nullable: false })
  readonly user: string;
  @Field({ nullable: false })
  readonly name: string;
  @Field({ nullable: true })
  readonly notes: string;
  @Field({ nullable: true })
  readonly createdAt?: Date;
  @Field({ nullable: true })
  readonly updatedAt?: Date;
  @Field(() => [String], { nullable: true })
  readonly listSong?: string[];
}

@ObjectType()
export class CreatePlaylistType {
  @Field(() => ID)
  readonly _id?: string;
}
