import * as React from 'react';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface GuestLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

const defaultDescription = 'Shop premium new and pre-owned vehicles with transparent finance, trade-in, import, and ownership tools.';

export default function GuestLayout({
  children,
  className,
  title = 'Welcome',
  description = defaultDescription,
}: GuestLayoutProps) {
  const pageTitle = `${title} | Dealership`;
  return (
    <div className={cn('min-h-screen bg-background text-foreground antialiased', className)}>
      <Head title={title}>
        <meta name="description" content={description} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-default.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
      </Head>
      {children}
    </div>
  );
}
