import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { Account } from "./interfaces/account.interface";

@Injectable()
export class AccountService {
  constructor(@InjectModel("Account") private accountModel: Model<Account>) {}

  async create(createAccountDto: AccountInput): Promise<AccountType> {
    const createAccount = new this.accountModel(createAccountDto);
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
}
