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
        text: "welcome", // plaintext body
        html: "<b>welcome</b>" // HTML body content
      })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
