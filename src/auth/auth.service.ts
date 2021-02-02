import { Injectable, NotFoundException } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { JwtService } from "@nestjs/jwt";
import { AccountType } from "../account/dto/create-account.dto";
import { AccountInput } from "../account/inputs/input-account.input";
import { AuthHelper } from "./helpers/auth.helpers";
import { JwtDto } from "./dto/jwt.dto";
import { AccountToken } from "./models/account-token";
import { Account } from "./models/account";
import { jwtConstants } from "./constants/jwtKey";

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(account_name: string, pass: string): Promise<any> {
    const user = await this.accountService.findOne(account_name);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async login(account: AccountInput): Promise<AccountToken> {
    const { account_name, password } = account;
    const found = await this.accountService.findByAccountName(account_name);
    if (!found) {
      throw new NotFoundException(
        `Tài khoản có tên ${account_name} không tồn tại`
      );
    }

    const passwordValid: boolean = await AuthHelper.validate(
      password,
      found.password
    );

    if (!passwordValid) {
      throw new Error(`Sai mật khẩu`);
    }

    const access_token = this.signToken(account_name);
    console.log(access_token);

    return {
      account: found,
      access_token
    };
  }

  private signToken(id: string) {
    const payload: JwtDto = { accountId: id };

    return this.jwtService.sign(payload, {
      secret: jwtConstants.secret
    });
  }

  // private validateUserJwt(token: string) {
  //   const user = jwtService.verify(token, )
  // }

  // public async createAccount(account: AccountInput) {
  //   const
  // }
}
