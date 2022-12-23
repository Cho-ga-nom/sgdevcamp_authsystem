import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from 'src/users/dto/login.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(loginDTO: LoginDTO): Promise<any> {
    const user = await this.usersService.findUser(loginDTO.email);
    if (user && user.password === loginDTO.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(validateUser: any) {
    const payload = { email: validateUser.email, nickname: validateUser.nickname };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}