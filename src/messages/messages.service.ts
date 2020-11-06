import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/user.schema';
import { MessageDto } from './dto/message.dto';
import { GroupedMessagesDto } from './dto/user-messages.dto';
import { Message } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<Message>,
  ) {}

  async findMessages(to: User): Promise<GroupedMessagesDto> {
    // TODO sort by post date
    return await this.messagesModel.aggregate([
      { $match: { "to.username": to.username } },
      { $group:
        {
          _id: "$from.username",
          messages: { $push: "$text" }
        }
      }
    ])
  }

  async post(text: string, from: User, to: User): Promise<MessageDto> {
    const message = new this.messagesModel({ text, from, to });
    return await message.save();
  }
}
