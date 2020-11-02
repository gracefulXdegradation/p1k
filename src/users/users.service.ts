import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user';

@Injectable()
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        id: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        id: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create({ username, password }: CreateUserDto): Promise<User> {
    const user = new User()
    user.id = new Date().getTime();
    user.username = username;
    user.password = password;
    this.users.push(user);
    return user;
  }
}