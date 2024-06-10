import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentDto } from './create-student.dto';
import { IsBoolean, IsDate, IsString } from 'class-validator';

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @IsString()
  name?: string;

  @IsDate()
  birthday?: Date;

  @IsString()
  cpf?: string;

  @IsString()
  plan_id?: any;

  @IsString()
  photo?: string;

  @IsBoolean()
  active?: boolean;

  @IsDate()
  due_date?: any;

  @IsString()
  instructor_id?: any;

  @IsString()
  gender?: string;
}
