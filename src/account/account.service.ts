import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { Account } from "./interfaces/account.interface";
import { AuthHelper } from "../auth/helpers/auth.helpers";
import { ProfileService } from "../profile/profile.service";
const crypto = require("crypto");

@Injectable()
export class AccountService {
  constructor(
    @InjectModel("Account") private accountModel: Model<Account>,
    private readonly profileService: ProfileService
  ) {}

  async create(createAccountDto: AccountInput): Promise<AccountType> {
    const found = await this.findByAccountName(createAccountDto.account_name);
    if (found) {
      throw new BadRequestException(
        `Tài khoản ${createAccountDto.account_name} đã tồn tại`
      );
    }
    const password = await AuthHelper.hash(createAccountDto.password);
    const createAccount = new this.accountModel({
      account_name: createAccountDto.account_name,
      password
    });

    await this.profileService.create(createAccount._id);

    return await createAccount.save();
  }

  async findOne(id: string): Promise<AccountType> {
    return await this.accountModel.findOne({ _id: id });
  }

  async findByAccountName(account_name: string): Promise<AccountType> {
    const result = await this.accountModel.findOne({ account_name });
    console.log(result);
    return result;
  }

  async getAll(): Promise<AccountType[]> {
    const result = await this.accountModel.find({});
    return result;
  }

  async forgotPassword(): Promise<string> {
    //const account = await this.accountModel.findOne({ account_name });
    const buf = await crypto.randomBytes(10).toString("hex");
    return buf;
  }
}
