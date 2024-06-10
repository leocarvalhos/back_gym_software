import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsString } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  username?: string;

  @IsString()
  photo?: string;

  @IsBoolean()
  active?: boolean;

  @IsString()
  role?: Role;
}
