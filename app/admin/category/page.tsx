import React from 'react';
import { CategoryForm } from '../_components/CategoryForm';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { GetAllCategory } from '@/actions/category';
import EditandRemove from '../_components/EditandRemove';

const page = async () => {
  const category = await GetAllCategory();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex justify-between">
        <h2 className="text-5xl font-bold">All Product</h2>
      </div>
      <div className="flex-1 justify-between max-lg:flex-col flex gap-4">
        <div className="bg-muted/50 flex-1 min-h-[100vh] rounded-xl md:min-h-min p-6">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>slug</TableHead>
                <TableHead className="text-right">Edit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {category.length &&
                category.map(({ id, name, slug }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell>{id.slice(0, 8)}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{slug}</TableCell>
                      <TableCell>
                        <EditandRemove id={id} />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        <div className="bg-muted/50  rounded-xl p-8 ">
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default page;
