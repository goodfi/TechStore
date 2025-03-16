'use server';

import { UserTable } from '@/db/schema';
import { db } from '@/db/drizzle';
import { SignInSchema, SignUpSchema } from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { comparePasswords, hashPassword } from '../core/passwordhasher';
import { cookies } from 'next/headers';
import { createUserSession, removeUserFromSession } from '../core/session';

export async function signIn(unsafeData: z.infer<typeof SignInSchema>) {
  const { success, data } = SignInSchema.safeParse(unsafeData);

  if (!success) return 'Unable to log you in';

  const user = await db.query.UserTable.findFirst({
    columns: { password: true, salt: true, id: true, email: true, role: true },
    where: eq(UserTable.email, data.email),
  });

  if (user == null || user.password == null) {
    return 'Unable to log you in1';
  }

  const isCorrectPassword = await comparePasswords({
    hashedPassword: user.password,
    password: data.password,
  });

  if (!isCorrectPassword) return 'Unable to log you in2';

  await createUserSession(user, await cookies());

  redirect('/');
}

export async function signUp(unsafeData: z.infer<typeof SignUpSchema>) {
  const { success, data } = SignUpSchema.safeParse(unsafeData);

  if (!success) return 'Unabel to create account';

  const existingUser = await db.query.UserTable.findFirst({
    where: eq(UserTable.email, data.email),
  });

  if (existingUser != null) return 'Account already exists for this email';
  try {
    const hashedPassword = await hashPassword(data.password, 10);

    const [user] = await db
      .insert(UserTable)
      .values({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      })
      .returning({ id: UserTable.id, role: UserTable.role });
    if (user == null) return 'Unable to create account ZSE';

    await createUserSession(user, await cookies());
  } catch (error) {
    return 'Unable to create account ZZZ' + error;
  }
  redirect('/');
}

export async function LogOut() {
  await removeUserFromSession(await cookies());
  redirect('/');
}
