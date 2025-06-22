import bcrypt from 'bcryptjs';

export const comparePasswords = async (plain: string, hash: string) => {
  return bcrypt.compare(plain, hash);
};