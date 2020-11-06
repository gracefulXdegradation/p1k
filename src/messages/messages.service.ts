import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './message.schema';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messagesModel: Model<Message>,
  ) {}

  async findMessages(to) {
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

  async post(text: string, from, to): Promise<any> {
    const message = new this.messagesModel({ text, from, to });

    try {
      await message.save();
      return message
    } catch (error) {
      throw error;
    }
  }
}
