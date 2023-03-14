import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Body, Param, Patch } from '@nestjs/common/decorators';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { UpdatePlayerDTO } from './player/dto/updatePlayer.dto';
import { CreatePlayerrDTO } from './player/dto/createPlayer.dto';
import { PlayerService } from './player/player.service';

@Controller()
export class AppController {
  constructor(
    private readonly playerService: PlayerService,
    private readonly authService: AuthService,
    ) {}

  @Post('signup')
  async signup(@Body() CreatePlayerrDTO: CreatePlayerrDTO) {
    return await this.playerService.createPlayer(CreatePlayerrDTO);
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

  @Patch('mypage/:email')
  async updatePlayer(@Param('email') email: string, @Body() updatePlayerDTO: UpdatePlayerDTO) {
    return await this.playerService.updatePlayer(email, updatePlayerDTO);
  }
}