import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getMyUser(@Req() req: Request) {
    return req.user;
  }
}
