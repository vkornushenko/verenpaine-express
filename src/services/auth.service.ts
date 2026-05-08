import { UserModel } from '../models/users.js';
import bcrypt from 'bcryptjs';
import { AppError } from '../utils/AppError.js';
import { handleMongoError } from '../utils/mongoError.js';

export async function createUserService(data: {
  name: string;
  email: string;
  password: string;
}) {
  // hash password
  const hashedPassword = await bcrypt.hash(data.password, 12);
  // create user
  try {
    const user = await UserModel.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  } catch (error) {
    throw handleMongoError(error);
  }
}

export async function loginUserService(email: string, password: string) {
  // find user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError('User not found', 404);
  }
  // checking password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid password', 401);
  }

  return user;
}

export async function getUserByIdService(userId: string){
  const user = await UserModel.findById({_id: userId});
  if(!user){
    throw new AppError('User not found', 404);
  }
  return user;
}