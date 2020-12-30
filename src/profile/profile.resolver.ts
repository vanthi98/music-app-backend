import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";
import { Profile } from "./interfaces/profile.interface";
import { ProfileType } from "./dto/create-profile.dto";
import { ProfileInput } from "./inputs/input-profile.input";

@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => ProfileType)
  async updateProfile(
    @Args("id") id: string,
    @Args("input") input: ProfileInput
  ): Promise<ProfileInput> {
    return this.profileService.update(input, id);
  }
}
