import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { ProfileService } from "./profile.service";
import { Profile } from "./interfaces/profile.interface";
import { ProfileType } from "./dto/create-profile.dto";
import { ProfileInput } from "./inputs/input-profile.input";
import { UseGuards } from "@nestjs/common";
import { GqlAuthGuard } from "../auth/graphqlAuth";
import { CtxUser } from "../auth/decorators/ctx-account.decorator";

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

  @Query(() => ProfileType)
  async getProfile(@Args("id") id: string): Promise<ProfileType> {
    return this.profileService.getProfileById(id);
  }

  @Query(() => ProfileType)
  async getProfileByAccountId(
    @Args("account_id") account_id: string
  ): Promise<ProfileType> {
    return this.profileService.getProfileByAccountId(account_id);
  }

  @Query(() => ProfileType)
  async getProfileByEmail(@Args("email") email: string): Promise<ProfileType> {
    return this.profileService.getProfileByEmail(email);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async followUser(
    @CtxUser() currentUser,
    @Args("follow_id") follow_id: string
  ): Promise<string> {
    return this.profileService.follow(currentUser, follow_id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async unFollowUser(
    @CtxUser() currentUser,
    @Args("follow_id") follow_id: string
  ): Promise<string> {
    return this.profileService.unFollow(currentUser, follow_id);
  }

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async checkFollow(
    @CtxUser() currentUser,
    @Args("follow_id") follow_id: string
  ): Promise<string> {
    return this.profileService.checkFollow(currentUser, follow_id);
  }
}
