import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class SongType {
  @Field(() => ID)
  readonly _id?: string;
  @Field()
  readonly song_name: string;
  @Field()
  readonly song_url: string;
  @Field()
  readonly song_image_url?: string;
  @Field()
  readonly lyric?: string;
  @Field()
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
