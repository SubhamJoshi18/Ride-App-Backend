import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../constants/modules.constant';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt();

  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const genSalt = async (): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return salt;
};
