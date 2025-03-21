import { getCurrentUser } from '@/components/auth/currentUser';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

import React from 'react';

const page = async () => {
  const currentUser = await getCurrentUser({
    withFullUser: true,
    redirectIfNotFound: true,
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl mb-8">Private: {currentUser.role}</h1>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
