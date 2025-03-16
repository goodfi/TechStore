'use client';

import { Button } from '@/components/ui/button';
import { LogOut } from './action/auth';

export function LogOutButton() {
  return (
    <Button
      variant="destructive"
      className="w-full"
      onClick={async () => await LogOut()}
    >
      Log Out
    </Button>
  );
}
