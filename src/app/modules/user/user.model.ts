/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  UserMethods,
  UserModel,
} from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
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

const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const ordersSchema = new Schema<TOrders>({
  productName: { type: String },
  price: { type: Number },
  quantity: { type: Number },
});

const userSchema = new Schema<TUser, UserModel, UserMethods>({
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
  isActive: { type: Boolean, default: true },
  hobbies: [{ type: String }],
  address: addressSchema,
  orders: [ordersSchema],
  isDeleted: { type: Boolean, default: false },
});

// userSchema.set('toJSON', {
//   transform: function (_doc, ret) {
//     delete ret.password;
//     return ret;
//   },
// });

// pre save middleware
userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook');
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// query middleware
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
userSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, UserModel>('User', userSchema);
