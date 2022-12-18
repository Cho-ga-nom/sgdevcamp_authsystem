import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { LoginDTO } from 'src/users/dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(loginDTO: LoginDTO): Promise<any> {
    const user = await this.authService.validateUser(loginDTO);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}