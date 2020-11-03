import { MinLength } from 'class-validator';

export class CreateUserDto {
  @MinLength(3, {
    message: 'Username must be at least 3 symbols long',
  })
  username: string;
  @MinLength(8, {
    message: 'Password must be at least 8 symbols long',
  })
  password: string;
}
