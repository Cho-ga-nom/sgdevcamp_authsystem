import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
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
    private readonly authService: AuthService,
    private readonly userService: UsersService
    ) {}

  @Post('signup')
  async signup(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile/:email')
  getProfile(@Param('email') email: string) {
    return this.userService.findUser(email);
  }
}