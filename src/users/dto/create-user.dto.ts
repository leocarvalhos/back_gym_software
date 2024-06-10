import { IsDate, IsEnum, IsString } from 'class-validator';
import { Role } from 'src/auth/role.enum';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsDate()
  birthday: Date;
}
