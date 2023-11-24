import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  // const result = await UserModel.create(user);

  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User already exist');
  }
  const result = await user.save();
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getSingleUserFromDB = async (userId: string) => {
  const result = await User.findOne({ userId });
  return result;
};

const updateUserFromDB = async (
  userId: string,
  updateFields: Partial<TUser>,
) => {
  const result = await User.updateOne({ userId }, { $set: updateFields });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
};
