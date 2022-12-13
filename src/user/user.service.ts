import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
//import { User } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/createUser.dto';

export type User = any;

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  /* 회원가입
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
  } */

  /* 로그인
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
  } */
}
