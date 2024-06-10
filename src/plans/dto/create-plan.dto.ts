import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsString()
  description?: string;

  @IsNumber()
  days: number;
}
