import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const newUser = new User();

      newUser.email = createUserDTO.email;
      newUser.password = createUserDTO.password;
      newUser.nickname = createUserDTO.nickname

      await this.userRepo.insert(newUser);
      return { msg: 'success', successMsg: '회원가입 성공' };
    } catch (err) {
      throw new NotFoundException('회원가입 실패');
    }
  }

  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user;
  }
}