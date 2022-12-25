스마일게이트 윈터데브캠프 인증 시스템
==================================

현재 프론트엔드 없이 기본적인 백엔드 기능만 구현한 상태입니다.
-------------------------
* 가입, 로그인, 유저 정보 업데이트
* 인증 서버 (현재 http 사용. 추후 https로 분리해야함)
* 비밀번호 암호화
***
추가로 구현해야 하는 기능
-----------------
* 프론트엔드 페이지
* 캐시 (Redis)
* E-Mail 인증
* 비밀번호 찾기
***

기술스택
--------
* Nest JS
* PostgreSQL
* jwt
***

확인받고 싶은 부분
-----------------
1. MSA 구조를 지향하며 만들었는데 제대로 적용한 건지 궁금합니다. MSA 구조가 아니라면 어떻게 해야하는지도 궁금합니다.
2. 아래 코드에 @Patch를 사용하는 메소드가 있습니다.

```
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Body, Param, Patch } from '@nestjs/common/decorators';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import { ChangeUserDTO } from './users/dto/changeUser.dto';
import { CreateUserDTO } from './users/dto/createUser.dto';
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

  @Patch('mypage/:email')
  async changeUser(@Param('email') email: string, @Body() changeUserDTO: ChangeUserDTO) {
    return await this.userService.changeUser(email, changeUserDTO);
  }
}
```
