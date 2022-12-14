import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // user.controller에서 routing.
  // validateUser 메소드를 호출하여 인증된 사용자인지 검증
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if(!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}