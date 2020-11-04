import { Prop, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class User extends mongoose.Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
};

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
