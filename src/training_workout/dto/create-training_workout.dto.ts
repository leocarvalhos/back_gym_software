import { IsNumber, IsString } from 'class-validator';

export class CreateTrainingWorkoutDto {
  @IsString()
  training_id: string;

  @IsString()
  workout_id: string;

  @IsNumber()
  sets: number;

  @IsString()
  repetitions: string;

  @IsNumber()
  order: number;
}
