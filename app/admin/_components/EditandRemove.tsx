'use client';

import { DeleteCategorybyId } from '@/actions/category';
import { Edit, Trash } from 'lucide-react';
import React from 'react';

const EditandRemove = (id: { id: string }) => {
  const Delete = async () => {
    await DeleteCategorybyId(id);
  };

  return (
    <div className="flex gap-4 justify-end">
      <Edit className="text-gray-400" />
      <Trash
        className="hover:text-destructive text-gray-400 cursor-pointer"
        onClick={() => Delete()}
      />
    </div>
  );
};

export default EditandRemove;
