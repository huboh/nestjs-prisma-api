import * as bcrypt from 'bcrypt';

export const SaltRounds = Number(process.env.SALT_ROUNDS) || 15;
export const FakeHashedPassword = `$2b$${SaltRounds}$invalid_password.dddddddddddddddddddddddddddddddddddd`;

export const hash = (password: string, saltRounds?: number) => {
  return bcrypt.hash(password, saltRounds || SaltRounds);
};

export const compare = (plainTextPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

export default {
  FakeHashedPassword,
  SaltRounds,
  compare,
  hash,
};