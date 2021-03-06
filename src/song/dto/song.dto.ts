import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class SongType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly song_name: string;
  @Field()
  readonly song_url: string;
  @Field({ nullable: true })
  readonly song_image_url?: string;
  @Field({ nullable: true })
  readonly lyric?: string;
  @Field({ nullable: true })
  readonly author?: string;
  @Field()
  readonly like: number;
  @Field()
  readonly comment: number;
  @Field()
  readonly listen: number;
  @Field()
  readonly share: number;
  @Field()
  readonly uploader: string;
  @Field()
  readonly duration: number;
  @Field(() => [String], { nullable: true })
  readonly listLikedUser?: string[];
}

@ObjectType()
export class UploadSongType {
  @Field(() => ID)
  readonly id?: string;
}
