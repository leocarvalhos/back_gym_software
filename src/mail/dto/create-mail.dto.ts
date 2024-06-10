import { IsString } from 'class-validator';

export class CreateMailDto {
  @IsString()
  text: string;

  @IsString()
  gym: string;

  @IsString()
  name: string;

  @IsString()
  subject: string;
}
