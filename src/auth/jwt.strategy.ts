import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Request에서 jwt를 추출
      ignoreExpiration: false,    // 토큰이 만료되었는지 검사. false면 strategt에서 바로 에러 리턴
      secretOrKey: process.env.JWT_KEY,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}