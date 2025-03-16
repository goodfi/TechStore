'use server';

import { eq, SQLWrapper } from 'drizzle-orm';
import { Category } from '../db/schema';
import { db } from '@/db/drizzle';

export async function GetAllCategory() {
  try {
    const category = await db.query.Category.findMany();

    return category;
  } catch {
    return [];
  }
}

export async function AddCategory(item: { name: string; slug: string }) {
  try {
    await db.insert(Category).values({
      name: item.name,
      slug: item.slug,
    });

    return { message: 'succes' };
  } catch (error) {
    return { message: 'something went wrong!:' + error };
  }
}

export async function DeleteCategorybyId({ id }: { id: string | SQLWrapper }) {
  try {
    await db.delete(Category).where(eq(Category.id, id));

    return { message: 'succes' };
  } catch (error) {
    return { message: 'something went wrong!:' + error };
  }
}
