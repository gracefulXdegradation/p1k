import { Controller, Request, Post, UseGuards, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Res() res, @Body() createUserDTO: CreateUserDto) {
    if(await this.authService.isUserExists(createUserDTO)){
      return res.status(HttpStatus.BAD_REQUEST).json({
          message: "User already exists"
      })
    }
    const user = await this.authService.create(createUserDTO);
    return res.status(HttpStatus.OK).json({ user })
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
