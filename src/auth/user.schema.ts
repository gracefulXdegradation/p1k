import * as mongoose from 'mongoose';

export interface User extends Document {
  readonly username: string;
  readonly password: string;
}

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});
