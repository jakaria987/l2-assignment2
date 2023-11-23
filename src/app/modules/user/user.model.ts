import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: { type: String },
  lastName: { type: String },
});

const addressSchema = new Schema<Address>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const ordersSchema = new Schema<Orders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<User>({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: { type: String },
  fullName: fullNameSchema,
  age: { type: Number },
  email: { type: String },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
  address: addressSchema,
  orders: [ordersSchema],
});
export const UserModel = model<User>('User', userSchema);
