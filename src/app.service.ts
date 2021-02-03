import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return "Hello World!";
  }

  public mailer(): void {
    this.mailerService
      .sendMail({
        to: "levanthi.tl9@gmail.com", // list of receivers
        from: "noreply@nestjs.com", // sender address
        subject: "Testing Nest MailerModule ✔", // Subject line
        template: "index",
        context: {
          code: "cf1a3f828287",
          username: "Văn Thi"
        }
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
