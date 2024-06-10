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
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingsService.create(createTrainingDto);
  }
  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  findTraining(@Param('id') id: string) {
    return this.trainingsService.findTraining(id);
  }

  @Patch(':id')
  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingsService.update(id, updateTrainingDto);
  }
  @HasRoles(Role.Admin, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingsService.delete(id);
  }
}
