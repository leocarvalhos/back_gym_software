import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDto } from './create-training.dto';
import { IsString } from 'class-validator';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
  @IsString()
  name?: string;

  @IsString()
  description?: string;
}
