import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutDto } from './create-workout.dto';
import { IsString } from 'class-validator';

export class UpdateWorkoutDto extends PartialType(CreateWorkoutDto) {
  @IsString()
  name?: string;
}
