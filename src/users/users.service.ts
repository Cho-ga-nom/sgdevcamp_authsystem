import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ChangeUserDTO } from './dto/changeUser.dto';
import { CreateUserDTO } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  // 비밀번호 암호화
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  // 회원가입
  async createUser(createUserDTO: CreateUserDTO) {
    try {
      const newUser = new User();

      newUser.email = createUserDTO.email;
      newUser.password = await this.hashPassword(createUserDTO.password);
      newUser.nickname = createUserDTO.nickname

      await this.userRepo.insert(newUser);
      return { msg: 'success', successMsg: '회원가입 성공' };
    } catch (err) {
      throw new NotFoundException('회원가입 실패');
    }
  }

  // 로그인
  async findUser(email: string): Promise<User | undefined> {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    return user;
  }

  // 회원정보 수정
  async changeUser(email: string, changeUserDTO: ChangeUserDTO) {
    return await this.userRepo
    .createQueryBuilder()
    .update(User)
    .set(
      {
        nickname: changeUserDTO.nickname,
        password: changeUserDTO.password,
      }
    )
    .where("email = :user_email", { user_email: email })
    .execute()
    .then(() => {
      return { msg: 'success', successMsg: '회원 정보 업데이트 성공' };
    })
    .catch(() => {
      throw new NotFoundException('회원 정보 업데이트 실패');
    })
  }
}