import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  login: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20)
  password: string;
}
