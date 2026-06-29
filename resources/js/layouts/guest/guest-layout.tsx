import * as React from 'react';
import SeoHead from '@/components/seo-head';
import { cn } from '@/lib/utils';

interface GuestLayoutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

const defaultDescription = 'Shop premium new and pre-owned vehicles with transparent finance, trade-in, import, and ownership tools.';

export default function GuestLayout({
  children,
  className,
  title = 'Welcome',
  description = defaultDescription,
  canonical,
  image,
  structuredData,
}: GuestLayoutProps) {
  return (
    <div className={cn('min-h-screen bg-background text-foreground antialiased', className)}>
      <SeoHead title={title} description={description} canonical={canonical} image={image} structuredData={structuredData} />
      {children}
    </div>
  );
}
