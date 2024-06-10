import { IsNumber, IsString } from 'class-validator';

export class CreateTrainingDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  student_id: string;

  trainingWorkout: TrainingWorkoutDto[];
}

class TrainingWorkoutDto {
  @IsString()
  workout_id: string;

  @IsString()
  sets: number;

  @IsString()
  repetitions: string;

  @IsNumber()
  order: number;
}
