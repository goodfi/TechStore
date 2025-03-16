import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function findParentName(
  category: {
    id: string;
    name: string;
    slug: string;
    parentId: string | null;
  }[],
  parentId: string | null
): string | null {
  if (parentId === null) return 'null';
  const parent = category.find((cat) => cat.id === parentId);
  return parent ? parent.name : 'null';
}
