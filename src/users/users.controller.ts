import {
  Bind,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role, stringToRole } from 'src/auth/role.enum';
import { HasRoles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { File, FileInterceptor } from '@nest-lab/fastify-multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/role/:role')
  async usersByRole(@Param('role') param: string) {
    const role: Role = stringToRole(param);
    const users = await this.usersService.findByRole(role);

    return users;
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get()
  users(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number = 5,
    @Query('user') user: string,
  ) {
    return this.usersService.findUser({ page, limit, user });
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  validateUser(@Request() req: any) {
    return req.user;
  }

  @HasRoles(Role.Admin, Role.Instructor, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  addPhoto(@UploadedFile() file: File, @Param('id') id: string) {
    return this.usersService.addPhoto(file, id);
  }

  @Post()
  @HasRoles(Role.Admin, Role.Receptionist)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @HasRoles(Role.Admin, Role.Receptionist)
  @UseGuards(JwtAuthGuard, RolesGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    delete updateUserDto.photo;

    delete updateUserDto.password;

    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
