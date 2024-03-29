import { hash, compare } from 'bcryptjs';

export async function hashPassword(password) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function comparePassword(password, hashedPassword) {
  const inValid = await compare(password, hashedPassword);
  return inValid;
}
