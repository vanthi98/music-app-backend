import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Profile } from "./interfaces/profile.interface";
import { ProfileType } from "./dto/create-profile.dto";
import { ProfileInput } from "./inputs/input-profile.input";

@Injectable()
export class ProfileService {
  constructor(@InjectModel("Profile") private profileModel: Model<Profile>) {}

  async create(
    accountId: string,
    profileData: ProfileInput
  ): Promise<ProfileType> {
    const { first_name, last_name, email, gender, age, birthday } = profileData;
    const emptyProfile: Profile = {
      account_id: "",
      first_name,
      last_name,
      email,
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
    return await this.profileModel.findOne({ email });
  }
}
