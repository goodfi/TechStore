import bcrypt from 'bcryptjs';

export function hashPassword(
  password: string,
  saltRounds: number
): Promise<string> {
  return bcrypt.hash(password.normalize(), saltRounds);
}

export async function comparePasswords({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) {
  return bcrypt.compare(password.normalize(), hashedPassword);
}

export function generateSalt(saltRounds: number): Promise<string> {
  return bcrypt.genSalt(saltRounds);
}
