import { IsString } from 'class-validator';

export class RenewalStudentDto {
  @IsString()
  plan_id: string;
}
