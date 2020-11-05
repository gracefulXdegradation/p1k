import { Body, Controller, Get, Param, Post, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PostMessageDto } from './dto/post-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(
    private authService: AuthService,
    private messagesService: MessagesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getMessages(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post(':username')
  async postMessage(
    @Request() req,
    @Param('username') username,
    @Body(ValidationPipe) { text }: PostMessageDto
  ) {
    const user = await this.authService.findUser(username);
    const message = await this.messagesService.post(text);
    return message;
  }
}
