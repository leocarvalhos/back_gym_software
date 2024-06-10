import { IsString } from 'class-validator';

export class CreateWorkoutDto {
  @IsString()
  name?: string;
}
