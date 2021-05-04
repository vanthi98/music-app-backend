import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreatePlaylistInput {
  @Field({ nullable: false })
  readonly name: string;
  @Field({ nullable: true })
  readonly notes?: string;
  @Field(() => [String], { nullable: true })
  readonly listSong?: string[];
}
