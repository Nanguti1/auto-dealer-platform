import * as React from 'react';
import { Head } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';

interface PublicLayoutProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function PublicLayout({ children, title, className }: PublicLayoutProps) {
    return (
        <div className={cn('min-h-screen bg-background', className)}>
            {title && <Head title={title} />}
            <StickyNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
