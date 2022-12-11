import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  // 회원가입
  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const newUser = new User();

      newUser.email = createUserDTO.email;
      newUser.password =createUserDTO.password;
      newUser.nickname = createUserDTO.nickname;

      await this.userRepo.insert(newUser);
      return { msg: 'success', successMsg: '회원가입이 완료 되었습니다.' };
    } catch (err) {
      throw new NotFoundException('오류가 발생하였습니다.');
    }
  }

  // 로그인
  async checkUser(email: string): Promise<User | any> {
    try {
      const user = await this.userRepo.findOne({
        where: { email }
      });
  
      if(!user) {
        return { msg: 'success', successMsg: '사용자를 찾을 수 없습니다.' };
      }
  
      return user;
    } catch (err) {
      throw new NotFoundException('오류가 발생하였습니다.');
    }
  }
}
