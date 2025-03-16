import Link from 'next/link';

import {
  ShoppingCart,
  User,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Watch,
  Tv,
  Heart,
  Menu,
  GalleryVerticalEnd,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SheetTrigger,
  Sheet,
  SheetContent,
  SheetTitle,
} from '@/components/ui/sheet';
import { getCurrentUser } from '@/components/auth/currentUser';
import { LogOutButton } from '@/components/auth/LoggOutButton';

export async function StoreHeader() {
  const user = await getCurrentUser({ withFullUser: true });

  const cartItemCount = 3; // This would be from your cart state

  const routes = [
    {
      href: '/products/laptops',
      label: 'Laptops',
      icon: Laptop,
    },
    {
      href: '/products/smartphones',
      label: 'Smartphones',
      icon: Smartphone,
    },
    {
      href: '/products/audio',
      label: 'Audio',
      icon: Headphones,
    },
    {
      href: '/products/cameras',
      label: 'Cameras',
      icon: Camera,
    },
    {
      href: '/products/wearables',
      label: 'Wearables',
      icon: Watch,
    },
    {
      href: '/products/tvs',
      label: 'TVs',
      icon: Tv,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      {user?.role === 'admin' && (
        <div className="w-full  flex justify-between items-center p-2 ">
          <h3>Witaj {user.name}</h3>

          <Link href={'/admin'}>
            <Button>przejd do panelu administratora</Button>
          </Link>
        </div>
      )}
      <div className="w-full bg-red-500 text-white text-center ">
        <h3>Promocja na majtki -10% z kodem Ludos 10</h3>
      </div>
      <div className="container flex h-16 items-center justify-between mx-auto px-4">
        <Link href="/" className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Tech Store.
        </Link>

        <p className="hidden font-bold sm:inline-block">SearchGlobal</p>
        <div className="flex  items-center justify-end space-x-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-muted-foreground"
          >
            <Heart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <SheetTitle></SheetTitle>
              <div className="px-7">
                <Link href="/" className="flex items-center">
                  <span className="font-bold text-xl">TechStore</span>
                </Link>
              </div>
              <div className="flex flex-col space-y-3 mt-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'flex items-center gap-2 px-7 py-2 text-sm font-medium hover:text-primary'
                    )}
                  >
                    <route.icon className="h-4 w-4" />
                    {route.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground">
                  <User className="h-5 w-5" />
                  <span className="">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <LogOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
      <div className="bg-border w-full h-px" />
      <div className="mx-auto container py-3 hidden md:block">
        <nav className="flex items-center justify-center space-x-6 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'flex items-center gap-1 transition-colors hover:text-primary'
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
