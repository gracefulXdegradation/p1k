import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Message extends mongoose.Document {
  @Prop({ required: true })
  text: string;
};

export const MessageSchema = new mongoose.Schema({
  text: String,
});
