import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { CreateUserDTO } from './users/dto/createUser.dto';
import { LoginDTO } from './users/dto/login.dto';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    ) {}

  @Post('signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}