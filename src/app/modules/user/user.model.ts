import { Schema, model } from 'mongoose';
import { Address, FullName, Orders, User } from './user.interface';

const fullNameSchema = new Schema<FullName>({
  firstName: {
    type: String,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
  lastName: {
    type: String,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
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
  userId: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String },
  fullName: fullNameSchema,
  age: { type: Number },
  email: {
    type: String,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not a valid email type',
    // },
  },
  isActive: { type: Boolean },
  hobbies: [{ type: String }],
  address: addressSchema,
  orders: [ordersSchema],
});
export const UserModel = model<User>('User', userSchema);
