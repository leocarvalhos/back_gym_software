import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async send(createMailDto: CreateMailDto) {
    await this.mailerService.sendMail({
      to: 'contato.crvsoftware@gmail.com',
      from: 'leandro.carvalho_saj@hotmail.com',
      subject: createMailDto.subject,
      html: ` <b>${createMailDto.name}</b> <br/><br/> <b>${createMailDto.gym}</b><br/><br/> ${createMailDto.text}`,
    });
  }
}
