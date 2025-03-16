import React from 'react';
import { ProductForm } from '../../_components/productForm';
import { db } from '@/db/drizzle';

const page = async () => {
  const category = await db.query.Category.findMany();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
        <p className="text-muted-foreground">
          Create a new product in your catalog.
        </p>
      </div>
      <ProductForm categories={category} />
    </div>
  );
};

export default page;
