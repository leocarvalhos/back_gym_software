import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsBoolean, IsString } from 'class-validator';

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @IsString()
  title?: string;

  @IsString()
  description?: string;

  @IsBoolean()
  read?: boolean;

  @IsString()
  student_id?: string;

  @IsString()
  instructor_id?: string;
}
