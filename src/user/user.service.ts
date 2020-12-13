import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "./dto/create-user.dto";
import { User } from "./interfaces/user.interface";
import { UserInput } from "./inputs/input-user.input";
import { AccountType } from "../account/dto/create-account.dto";
import { AccountInput } from "../account/inputs/input-account.input";

@Injectable()
export class UserService {
  constructor(@InjectModel("User") private userModel: Model<User>) {}

  async create(createUserDto: UserInput): Promise<UserType> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async findAll(): Promise<UserType[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserType> {
    return await this.userModel.findOne({ _id: id });
  }

  async delete(id: string): Promise<UserType> {
    return await this.userModel.findByIdAndRemove(id);
  }

  async update(id: string, user: User): Promise<UserType> {
    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }
}
