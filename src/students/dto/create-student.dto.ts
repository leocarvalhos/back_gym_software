import { IsDate, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name?: string;

  @IsDate()
  birthday?: Date;

  @IsString()
  cpf: string;

  @IsString()
  plan_id?: any;

  @IsString()
  instructor_id?: any;

  @IsString()
  gender?: string;
}
