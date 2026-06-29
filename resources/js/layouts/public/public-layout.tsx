import * as React from 'react';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    canonical?: string;
    image?: string;
    className?: string;
}

const defaultDescription = 'Explore premium vehicles, transparent financing, trade-ins, imports, and concierge automotive support from Dealership.';

export default function PublicLayout({ children, title, description = defaultDescription, canonical, image = '/images/og-default.jpg', className }: PublicLayoutProps) {
    const pageTitle = title ? `${title} | Dealership` : 'Dealership';
    return (
        <div className={cn('min-h-screen bg-background text-foreground antialiased', className)}>
            <Head title={title}>
                <meta name="description" content={description} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={image} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={image} />
                {canonical && <link rel="canonical" href={canonical} />}
            </Head>
            <StickyNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
