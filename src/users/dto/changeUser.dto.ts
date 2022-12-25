import { IsEmail, IsString } from 'class-validator';

export class ChangeUserDTO {
  @IsString()
  nickname: string;

  @IsString()
  password: string;
}