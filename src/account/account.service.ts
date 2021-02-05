import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { ResetPasswordInput } from "./inputs/input-resetPassword.input";
import { Account } from "./interfaces/account.interface";
import { AuthHelper } from "../auth/helpers/auth.helpers";
import { ProfileService } from "../profile/profile.service";
import { MailerService } from "@nestjs-modules/mailer";
const crypto = require("crypto");

@Injectable()
export class AccountService {
  constructor(
    @InjectModel("Account") private accountModel: Model<Account>,
    private readonly profileService: ProfileService,
    private readonly mailerService: MailerService
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

  async findByResetPasswordToken(token: string): Promise<AccountType> {
    const result = await this.accountModel.findOne({
      resetPasswordToken: token
    });
    console.log(result);
    return result;
  }

  async getAll(): Promise<AccountType[]> {
    const result = await this.accountModel.find({});
    return result;
  }

  async forgotPassword(account_name: string): Promise<AccountType> {
    const found = await this.findByAccountName(account_name);
    if (!found) {
      throw new BadRequestException(`Tài khoản ${account_name} không tồn tại`);
    }
    console.log(found);
    const token = await crypto.randomBytes(10).toString("hex");

    const result = await this.accountModel.findOneAndUpdate(
      { account_name },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 900000 },
      { upsert: true }
    );

    this.mailerService
      .sendMail({
        to: account_name, // list of receivers
        from: "noreply@nestjs.com", // sender address
        subject: "Testing Nest MailerModule ✔", // Subject line
        template: "index",
        context: {
          code: token,
          username: "Văn Thi"
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });

    return result;
  }

  async confirmForgotPasswordToken(token: string): Promise<boolean> {
    const found = await this.findByResetPasswordToken(token);

    if (!found) {
      throw new BadRequestException(`Token không chính xác, vui lòng nhập lại`);
    }

    const { resetPasswordExpires } = found;
    console.log(resetPasswordExpires);
    console.log(Date.now());
    if (resetPasswordExpires < Date.now()) {
      throw new BadRequestException(
        `Token đã hết hạn, vui lòng yêu cầu 1 token mới`
      );
    }
    return true;
  }

  async resetForgotPassword(input: ResetPasswordInput): Promise<AccountType> {
    const { token, password } = input;
    const found = await this.findByResetPasswordToken(token);

    if (!found) {
      throw new BadRequestException(`Token không chính xác, vui lòng nhập lại`);
    }

    const { resetPasswordExpires } = found;
    console.log(resetPasswordExpires);
    console.log(Date.now());
    if (resetPasswordExpires < Date.now()) {
      throw new BadRequestException(
        `Token đã hết hạn, vui lòng yêu cầu 1 token mới`
      );
    }

    const result = await this.accountModel.findOneAndUpdate(
      { password },
      { resetPasswordToken: undefined, resetPasswordExpires: undefined },
      { upsert: true }
    );

    if (!result) return result;
  }
}
