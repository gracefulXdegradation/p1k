import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
    const { username, password } = authCredentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new this.userModel({ username, password: hashedPassword });

    try {
      await user.save();
      return this.generateAccessToken(user);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exists');
      }
      throw error;
    }
  }

  signIn(user: User) {
    return this.generateAccessToken(user);
  }

  async validateUser(username: string, pass: string): Promise<User> {
    const user = await this.findUser(username);

    if (!user) {
      return null;
    }

    const valid = await bcrypt.compare(pass, user.password);

    return valid ? user : null
  }

  findUser(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }

  private generateAccessToken(user: User) {
    const payload = { username: user.username, sub: (user as any)._id }; // TODO any
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}