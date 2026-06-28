import * as React from 'react';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface GuestLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function GuestLayout({
  children,
  className,
  title = 'Welcome',
}: GuestLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background', className)}>
      <Head title={title} />
        {children}    
    </div>
  );
}
