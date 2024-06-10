import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanDto } from './create-plan.dto';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class UpdatePlanDto extends PartialType(CreatePlanDto) {
  @IsString()
  name?: string;

  @IsNumber()
  value?: number;

  @IsNumber()
  days?: number;
}
