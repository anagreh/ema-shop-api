import mongoose, { Schema } from 'mongoose';

export type User = {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  date_of_birth: Date;
};

export const UserSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, require: true, select: false },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  date_of_birth: { type: Date },
});

export const UserModel = mongoose.model('User', UserSchema);
