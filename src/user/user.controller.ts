import { Controller, Post, Request, Body, Param, UseGuards, Get } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  // 허용된 사용자만 요청 허용
  @UseGuards(LocalAuthGuard)   // UseGuards: 허용된 유저의 요청만 받아들이는 미들웨어
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  /*@Post('signup')
  async createUser(@Body() createUserDTO: CreateUserDTO) {
    return await this.userService.createUser(createUserDTO);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login/:email')
  async login(@Param('email') email: string) {
    return await this.userService.checkUser(email);
  } */
}
