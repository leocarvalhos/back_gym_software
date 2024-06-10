import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findUserByUsername(username);

      if (!user) {
        throw new UnauthorizedException();
      }

      const passValidation = await bcrypt.compare(pass, user.password);

      if (!passValidation) {
        throw new UnauthorizedException();
      }

      const payload = {
        username: user.username,
        sub: user.id,
        role: user.role,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return { user: result, access_token: this.jwtService.sign(payload) };
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
