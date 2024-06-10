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
import { PlansService } from './plans.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Post()
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() @Param('id') createPlanDto: CreatePlanDto) {
    return this.plansService.create(createPlanDto);
  }

  @Get()
  @HasRoles(Role.Admin, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  @HasRoles(Role.Admin, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findOneByID(id: string) {
    return this.plansService.findOneByID(id);
  }

  @Patch(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.plansService.update(id, updatePlanDto);
  }

  @Delete(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  delete(@Param('id') id: string) {
    return this.plansService.delete(id);
  }
}
