import { AccountService } from "./../account/account.service";
import { Injectable, Inject, forwardRef } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "./interfaces/profile.interface";
import { ProfileType } from "./dto/create-profile.dto";
import { ProfileInput } from "./inputs/input-profile.input";
import * as mongoose from "mongoose";

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel("Profile") private profileModel: Model<Profile>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService
  ) {}

  async create(
    accountId: string,
    profileData: ProfileInput
  ): Promise<ProfileType> {
    const {
      first_name,
      last_name,
      account_name,
      gender,
      age,
      birthday
    } = profileData;
    const emptyProfile: Profile = {
      account_id: "",
      first_name,
      last_name,
      account_name,
      gender,
      age,
      birthday
    };
    const createProfile = new this.profileModel({
      ...emptyProfile,
      account_id: accountId
    });
    return await createProfile.save();
  }

  async update(profileDto: Profile, profileId: string): Promise<ProfileType> {
    const updateProfile = await this.profileModel.findByIdAndUpdate(
      profileId,
      profileDto,
      {
        new: true
      }
    );
    return await updateProfile;
  }

  async getProfileById(id: string): Promise<ProfileType> {
    return await this.profileModel.findOne({ _id: id });
  }

  async getProfileByAccountId(id: string): Promise<ProfileType> {
    return await this.profileModel.findOne({ account_id: id });
  }

  async getProfileByEmail(email: string): Promise<ProfileType> {
    const user = await this.accountService.findByEmail(email);
    if (!user) {
      throw new Error("Email không tồn tại");
    } else {
      return await this.getProfileByAccountId(user.id);
    }
  }

  async getProfileByEmailWithLikedSong(email: string): Promise<ProfileType> {
    const user = await this.accountService.findByEmail(email);
    if (!user) {
      throw new Error("Email không tồn tại");
    } else {
      const result = await this.profileModel
        .findOne({ account_id: user.id })
        .populate("songs");
      return result;
    }
  }

  async checkFollow(currentUser: any, follow_id: string): Promise<string> {
    const user = await this.accountService.findByEmail(
      currentUser.payload.accountId
    );
    if (!user) {
      return Promise.reject("Cant find user");
    }
    const account_id = user.id;
    const profile = await this.getProfileByAccountId(account_id);
    if (profile.id === follow_id) {
      return "yourself";
    }
    const { listFollowings } = profile;
    if (listFollowings.indexOf(follow_id) > -1) {
      return "true";
    }
    return "false";
  }

  async follow(currentUser: any, follow_id: string): Promise<string> {
    const followUser = await this.getProfileById(follow_id);
    if (!followUser) {
      return Promise.reject("Cant find user to follow");
    }
    if (follow_id === currentUser.payload.accountId) {
      return Promise.reject("Cant follow yourself");
    } else {
      const user = await this.accountService.findByEmail(
        currentUser.payload.accountId
      );
      if (!user) {
        return Promise.reject("Cant find user");
      }
      const account_id = user.id;
      const profile = await this.getProfileByAccountId(account_id);
      const { listFollowings } = profile;
      if (!listFollowings || listFollowings.length === 0) {
        await this.update(
          {
            listFollowings: [
              ...listFollowings,
              new mongoose.mongo.ObjectId(follow_id)
            ]
          },
          profile.id
        );
      } else {
        if (listFollowings.indexOf(follow_id) > -1) {
          return Promise.reject("This user is exist in your followings list");
        } else {
          await this.update(
            {
              listFollowings: [
                ...listFollowings,
                new mongoose.mongo.ObjectId(follow_id)
              ]
            },
            profile.id
          );
        }
      }
      const { listFollowers } = followUser;
      if (!listFollowers || listFollowers.length === 0) {
        await this.update(
          {
            listFollowers: [
              ...listFollowers,
              new mongoose.mongo.ObjectId(profile.id)
            ]
          },
          follow_id
        );
      } else {
        if (listFollowers.indexOf(profile.id) > -1) {
          return Promise.reject("You are exist in this user followers list");
        } else {
          await this.update(
            {
              listFollowers: [
                ...listFollowers,
                new mongoose.mongo.ObjectId(profile.id)
              ]
            },
            follow_id
          );
        }
      }
    }
    return follow_id;
  }

  async unFollow(currentUser: any, follow_id: string): Promise<string> {
    const followUser = await this.getProfileById(follow_id);
    if (!followUser) {
      return Promise.reject("Cant find user to unfollow");
    }
    if (follow_id === currentUser.payload.accountId) {
      return Promise.reject("Cant unfollow yourself");
    } else {
      const user = await this.accountService.findByEmail(
        currentUser.payload.accountId
      );
      if (!user) {
        return Promise.reject("Cant find user");
      }
      const account_id = user.id;
      const profile = await this.getProfileByAccountId(account_id);
      const { listFollowings } = profile;
      console.log(listFollowings, follow_id);
      if (!listFollowings || listFollowings.length === 0) {
        throw new Error("Error occur when unfollow user");
      } else {
        if (listFollowings.indexOf(follow_id) > -1) {
          const temp = listFollowings;
          temp.splice(listFollowings.indexOf(follow_id), 1);
          console.log(temp, profile.id);
          await this.update(
            {
              listFollowings: temp
            },
            profile.id
          );
        } else {
          return Promise.reject(
            "This user is not exist in your followings list"
          );
        }
      }
      const { listFollowers } = followUser;
      if (!listFollowers || listFollowers.length === 0) {
        throw new Error("Error occur when unfollow user");
      } else {
        if (listFollowers.indexOf(profile.id) > -1) {
          const temp = listFollowers;
          temp.splice(listFollowers.indexOf(profile.id), 1);
          await this.update(
            {
              listFollowers: temp
            },
            follow_id
          );
        } else {
          return Promise.reject("You is not exist in this user followers list");
        }
      }
    }
    return follow_id;
  }
}
