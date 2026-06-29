import * as React from 'react';
import { cn } from '@/lib/utils';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';
import SeoHead from '@/components/seo-head';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    structuredData?: Record<string, unknown> | Record<string, unknown>[];
    className?: string;
}

const defaultDescription = 'Explore premium vehicles, transparent financing, trade-ins, imports, and concierge automotive support from Dealership.';

export default function PublicLayout({ children, title, description = defaultDescription, canonical, image, structuredData, className }: PublicLayoutProps) {
    return (
        <div className={cn('min-h-screen bg-background text-foreground antialiased', className)}>
            <SeoHead title={title} description={description} canonical={canonical} image={image} structuredData={structuredData} />
            <StickyNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
