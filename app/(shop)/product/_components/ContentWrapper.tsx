import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const ContentWrapper = ({
  title,
  children,
  className,
  hack,
}: {
  hack?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(' bg-background border-2 p-6 rounded-md  mt-8', className)}
      id={hack}
    >
      <h3 className="text-2xl  font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
};

export default ContentWrapper;
