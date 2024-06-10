import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingWorkoutDto } from './create-training_workout.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTrainingWorkoutDto extends PartialType(
  CreateTrainingWorkoutDto,
) {
  @IsString()
  training_workout_id: string;

  @IsString()
  workout_id: string;

  @IsString()
  sets?: number;

  @IsString()
  repetitions?: string;

  @IsNumber()
  order?: number;
}
