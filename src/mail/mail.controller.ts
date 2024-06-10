import { Body, Controller, Post } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  send(@Body() createMailDto: CreateMailDto) {
    return this.mailService.send(createMailDto);
  }
}
