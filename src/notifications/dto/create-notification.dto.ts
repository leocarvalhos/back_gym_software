import { IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  student_id: string;

  @IsString()
  instructor_id: string;
}
