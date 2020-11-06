import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Message extends mongoose.Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  from: {
    _id: string;
    username: string;
  }

  @Prop({ required: true })
  to: {
    _id: string,
    username: string;
  }
};

export const MessageSchema = new mongoose.Schema({
  text: String,
  from: {
    _id: String,
    username: String
  },
  to: {
    _id: String,
    username: String
  },
});
