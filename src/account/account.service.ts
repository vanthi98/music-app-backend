import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AccountType } from "./dto/create-account.dto";
import { AccountInput } from "./inputs/input-account.input";
import { ResetPasswordInput } from "./inputs/input-resetPassword.input";
import { Account } from "./interfaces/account.interface";
import { AuthHelper } from "../auth/helpers/auth.helpers";
import { ProfileService } from "../profile/profile.service";
import { ProfileInput } from "../profile/inputs/input-profile.input";
import { ProfileType } from "../profile/dto/create-profile.dto";
import { MailerService } from "@nestjs-modules/mailer";
import crypto from "crypto-js";

const makeid = async length => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

console.log(makeid(5));

@Injectable()
export class AccountService {
  constructor(
    @InjectModel("Account") private accountModel: Model<Account>,
    @Inject(forwardRef(() => ProfileService))
    private readonly profileService: ProfileService,
    private readonly mailerService: MailerService
  ) {}

  async create(createAccountDto: AccountInput): Promise<AccountType> {
    const found: AccountType = await this.findByEmail(createAccountDto.email);
    if (found) {
      throw new BadRequestException(
        `Tài khoản ${createAccountDto.email} đã tồn tại`
      );
    }

    const password: string = await AuthHelper.hash(createAccountDto.password);
    const createAccount = new this.accountModel({
      email: createAccountDto.email,
      password
    });

    await this.profileService.create(createAccount._id, createAccountDto);

    return await createAccount.save();
  }

  async findOne(id: string): Promise<AccountType> {
    return await this.accountModel.findOne({ _id: id });
  }

  async findByAccountName(account_name: string): Promise<AccountType> {
    const result = await this.accountModel.findOne({ account_name });
    return result;
  }

  async findByEmail(email: string): Promise<AccountType> {
    const result = await this.accountModel.findOne({ email });
    return result;
  }

  async findByResetPasswordToken(token: string): Promise<AccountType> {
    const result = await this.accountModel.findOne({
      resetPasswordToken: token
    });
    return result;
  }

  async getAll(): Promise<AccountType[]> {
    const result = await this.accountModel.find({});
    return result;
  }

  async forgotPassword(email: string): Promise<any> {
    const found = await this.findByEmail(email);
    if (!found) {
      throw new BadRequestException(`Email ${email} không tồn tại`);
    }

    const token = await makeid(20);
    console.log(token);

    const result = await this.accountModel.findOneAndUpdate(
      { _id: found.id },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 900000 },
      { upsert: true, new: true }
    );

    this.mailerService
      .sendMail({
        to: email, // list of receivers
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
    if (resetPasswordExpires < Date.now()) {
      throw new BadRequestException(
        `Token đã hết hạn, vui lòng yêu cầu 1 token mới`
      );
    }

    const hasedPassword: string = await AuthHelper.hash(password);

    const result = await this.accountModel.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
        password: hasedPassword
      },
      { upsert: true, new: true }
    );

    if (result) return result;
  }

  async deleteResetPasswordToken(email: string): Promise<any> {
    try {
      const deleteToken = await this.accountModel.findOneAndUpdate(
        { email },
        {
          resetPasswordToken: undefined,
          resetPasswordExpires: undefined
        },
        { upsert: true, new: true }
      );
      return deleteToken.email;
    } catch (error) {
      return Promise.reject("Error occur when delete token");
    }
  }
}
