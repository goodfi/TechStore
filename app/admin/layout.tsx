import { AppSidebar } from '@/components/app-sidebar';
import { getCurrentUser } from '@/components/auth/currentUser';
import BreadCrumb from '@/components/BreadCrumb';

import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ReactNode } from 'react';

const LayoutAdmin = async ({ children }: { children: ReactNode }) => {
  const user = await getCurrentUser({ withFullUser: true });
  return (
    <SidebarProvider>
      <AppSidebar user={{ name: user?.name, email: user?.email }} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <BreadCrumb />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default LayoutAdmin;
