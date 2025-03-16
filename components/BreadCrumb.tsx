'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const BreadCrumb = () => {
  const pathname = usePathname();
  const NameRoute = pathname.split('/');
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block" suppressHydrationWarning>
          <BreadcrumbLink href={`/${NameRoute[1]}`}>
            {NameRoute[1]}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
