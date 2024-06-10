import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TrainingWorkoutService } from './training_workout.service';
import { CreateTrainingWorkoutDto } from './dto/create-training_workout.dto';
import { UpdateTrainingWorkoutDto } from './dto/update-training_workout.dto';
import { HasRoles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('training-workout')
export class TrainingWorkoutController {
  constructor(
    private readonly trainingWorkoutService: TrainingWorkoutService,
  ) {}

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTrainingWorkoutDto: CreateTrainingWorkoutDto) {
    return this.trainingWorkoutService.create(createTrainingWorkoutDto);
  }

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findByID(@Param('id') id: string) {
    return this.trainingWorkoutService.findByTrainingID(id);
  }

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  update(@Body() updateTrainingWorkoutDto: UpdateTrainingWorkoutDto[]) {
    return this.trainingWorkoutService.updateInBatch(updateTrainingWorkoutDto);
  }

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateUnique(
    @Param('id') id: string,
    @Body() updateTrainingWorkoutDto: UpdateTrainingWorkoutDto,
  ) {
    return this.trainingWorkoutService.update(id, updateTrainingWorkoutDto);
  }

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingWorkoutService.delete(id);
  }
}
