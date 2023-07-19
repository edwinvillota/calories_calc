import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './dto/JWTPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authCredentials: AuthCredentialsDto) {
    const user = await this.usersService.getUserByEmailWithPassword(
      authCredentials.email,
    );

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(
      authCredentials.password,
      user.password,
    );

    if (!isPasswordValid) return null;

    return user;
  }

  async login(authCredentials: AuthCredentialsDto) {
    const user = await this.validateUser(authCredentials);

    if (!user) {
      throw new UnauthorizedException();
    }

    const payload: JwtPayload = { email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
