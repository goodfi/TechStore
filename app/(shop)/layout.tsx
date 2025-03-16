import React, { ReactNode } from 'react';
import { StoreHeader } from './_components/headers';
import Footer from './_components/Footer';

const LayoutAuth = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-svh  flex-col">
      <StoreHeader />
      <main className="flex-1 w-full mx-auto max-w-[1480px] p-2">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LayoutAuth;
