import { InputType, Field, Int } from "@nestjs/graphql";
@InputType()
export class SongInput {
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
}

@InputType()
export class SongUpdateInput {
  @Field({ nullable: true })
  readonly song_name?: string;
  @Field({ nullable: true })
  readonly song_url?: string;
  @Field({ nullable: true })
  readonly song_image_url?: string;
  @Field({ nullable: true })
  readonly lyric?: string;
  @Field({ nullable: true })
  readonly author?: string;
}
