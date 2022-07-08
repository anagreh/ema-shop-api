import mongoose, { Schema } from 'mongoose';

export type User = {
  email: string;
  password?: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
};

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true, select: false },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date },
});

export const UserModel = mongoose.model('User', UserSchema);
