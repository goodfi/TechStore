'use server';

import { db } from '@/db/drizzle';
import { Category, Product, ProductToCategory } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export async function AddProduct(item: {
  name: string;
  description: string;
  price: number;
  reductionprice: number;
  inventory: number;
  category: string;
  images: string;
}) {
  try {
    const [insertedProduct] = await db
      .insert(Product)
      .values({
        name: item.name,
        desc: item.description,
        price: item.price,
        reductionPrice: item.reductionprice,
        quantity: item.inventory,
        img: item.images,
        slug: '/' + item.name, // Add appropriate value

        lowestPrice: 0, // Add appropriate value
      })
      .returning({ id: Product.id, name: Product.name });

    const category = await db
      .select()
      .from(Category)
      .where(eq(Category.id, item.category));

    if (category) {
      await db.insert(ProductToCategory).values({
        productId: insertedProduct.id,
        categoryId: category[0].id,
      });
    } else {
      throw new Error('Category not found');
    }

    redirect('/admin/products');
    return { message: 'succes' };
  } catch (error) {
    return { message: 'something went wrong!:' + error };
  }
}
