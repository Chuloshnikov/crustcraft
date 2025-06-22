import { connectToDB } from './mongoose';
import { User } from '@/models/User';

export const getUserByEmail = async (email: string) => {
  await connectToDB();
  return User.findOne({ email });
};