import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMessages(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username')
  async postMessage(@Request() req, @Param() params) {
    const user = await this.authService.findUser(params.username)
    return user;
  }
}
