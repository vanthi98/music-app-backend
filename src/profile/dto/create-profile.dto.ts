import { SongType } from "./../../song/dto/song.dto";
import { ObjectType, Field, Int, ID } from "@nestjs/graphql";

@ObjectType()
export class ProfileType {
  @Field(() => ID)
  readonly id?: string;
  @Field({ nullable: true })
  readonly account_id?: string;
  @Field({ nullable: true })
  readonly first_name?: string;
  @Field({ nullable: true })
  readonly last_name?: string;
  @Field({ nullable: true })
  readonly email?: string;
  @Field({ nullable: true })
  readonly age?: number;
  @Field({ nullable: true })
  readonly gender?: boolean;
  @Field({ nullable: true })
  readonly birthday?: string;
  @Field({ nullable: true })
  readonly avatarUrl?: string;
  @Field({ nullable: true })
  readonly account_name?: string;
  @Field(() => [String], { nullable: true })
  readonly listLikedSong?: string[];
  @Field(() => [String], { nullable: true })
  readonly listFollowings?: string[];
  @Field(() => [String], { nullable: true })
  readonly listFollowers?: string[];
}
