import React from 'react';

import { db } from '@/db/drizzle';
import { Category, Product, ProductToCategory } from '@/db/schema';
import { eq } from 'drizzle-orm';

import { ProductsTable } from '../_components/products-table';
import { Button } from '@/components/ui/button';

const page = async () => {
  // const product = await db.select().from(Product);

  let product = await db
    .select()
    .from(Product)
    .leftJoin(ProductToCategory, eq(Product.id, ProductToCategory.productId))
    .leftJoin(Category, eq(ProductToCategory.categoryId, Category.id));

  if (!product) product = null;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex max-md:flex-col items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold tracking-tight ">Products</h2>
          <p className="text-muted-foreground">
            Manage your product catalog, inventory, and pricing.
          </p>
        </div>
        <div>
          <Button asChild>
            <a href="/admin/products/new">Add Product</a>
          </Button>
        </div>
      </div>
      <ProductsTable products={product} />
    </div>
  );
};

export default page;
