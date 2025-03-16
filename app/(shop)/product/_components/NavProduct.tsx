import React from 'react';
import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';

const NavProduct = () => {
  const routes = [
    {
      href: '#opis',
      label: 'Opis',
    },
    {
      href: '#specyfikacja',
      label: 'Specyfikacja',
    },
    {
      href: '#Akcesoria',
      label: 'Akcesoria',
    },
    {
      href: '#Opinie',
      label: 'Opinie',
    },
    {
      href: '#PytaniaiOdpowiedzi',
      label: 'Pytania i Odpowiedzi',
    },
  ];
  return (
    <div className="mx-auto  py-2 mt-8 sticky top-[136px] z-90 bg-background   border-2 rounded-md w-full ">
      <nav className="flex items-center justify-center space-x-6 text-sm font-medium flex-wrap">
        {routes.map((route) => (
          <a
            key={route.href}
            href={route.href}
            className={cn('flex items-center gap-1 transition-colors  ')}
          >
            <Badge variant="secondary" className="text-[18px]">
              {route.label}
            </Badge>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default NavProduct;
