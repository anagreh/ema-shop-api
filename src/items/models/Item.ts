import mongoose, { Schema } from 'mongoose';

import { UserModel } from '../../users/models/User';

export enum Category {
  'electric',
}

export type Item = {
  user_id: string;
  name: string;
  description: string;
  price: string;
  imgs: string[];
  stock: number;
};

export const ItemSchema = new Schema<Item>({
  user_id: { type: Schema.Types.ObjectId, required: true, ref: UserModel },
  name: { type: String, require: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  imgs: { type: [String] },
  stock: { type: Number },
});

export const ItemModel = mongoose.model('item', ItemSchema);
