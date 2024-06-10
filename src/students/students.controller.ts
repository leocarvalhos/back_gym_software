import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  DefaultValuePipe,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HasRoles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { RenewalStudentDto } from './dto/renewal.dto';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('all/:id')
  findStudentBy2(@Param('id') id: string) {
    return this.studentsService.findStudentWithAllData(id);
  }

  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(@UploadedFile() file: File, @Param('id') id: string) {
    return this.studentsService.addPhoto(file, id);
  }

  @HasRoles(Role.Admin, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('create')
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get(':id')
  findStudentByID(@Param('id') id: string) {
    return this.studentsService.findStudentByID(id);
  }

  @Get()
  findStudents(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
    @Query('basic', new DefaultValuePipe(false), ParseBoolPipe)
    basic: boolean = false,
    @Query('student') student: string,
    @Query('filter')
    filter: string,
  ) {
    return this.studentsService.findStudents({
      page,
      limit,
      basic,
      student,
      filter,
    });
  }
  @HasRoles(Role.Admin, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/renewal')
  renewal(
    @Param('id') id: string,
    @Body() renewalStudentDto: RenewalStudentDto,
  ) {
    return this.studentsService.renewal(id, renewalStudentDto);
  }

  @HasRoles(Role.Admin, Role.Receptionist, Role.Instructor)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    delete updateStudentDto.photo;

    return this.studentsService.update(id, updateStudentDto);
  }

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.delete(id);
  }
}
