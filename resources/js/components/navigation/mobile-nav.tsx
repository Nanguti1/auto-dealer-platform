import { Link, usePage } from '@inertiajs/react';
import { Menu, X, Home, Car, DollarSign, FileText, Phone, User, LogOut } from 'lucide-react';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import type { Auth } from '@/types';

interface MobileNavProps {
  className?: string;
}

export default function MobileNav({ className }: MobileNavProps) {
  const { auth } = usePage().props as { auth?: Partial<Auth> };
  const [open, setOpen] = React.useState(false);

  const getInitials = (name?: string) => {
    if (!name) {
return 'U';
}

    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Inventory', href: '/inventory', icon: Car },
    { name: 'Finance', href: '/finance/calculator', icon: DollarSign },
    { name: 'Trade-In', href: '/trade-in/request', icon: FileText },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn('lg:hidden', className)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">DL</span>
              </div>
              <span className="font-bold">Dealership</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* User Info */}
          {auth?.user && (
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg mb-6">
              <Avatar className="h-10 w-10">
                <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                <AvatarFallback>{getInitials(auth.user.name)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{auth.user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{auth.user.email}</p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            ))}

            <div className="border-t my-4" />

            {auth?.user ? (
              <>
                <Link
                  href="/customer/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <User className="h-5 w-5 shrink-0" />
                  Dashboard
                </Link>
                <Link
                  href="/logout"
                  method="post"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  Log out
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <User className="h-5 w-5 shrink-0" />
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <User className="h-5 w-5 shrink-0" />
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t pt-4 mt-auto">
            <p className="text-xs text-muted-foreground text-center">
              &copy; 2024 Dealership. All rights reserved.
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
