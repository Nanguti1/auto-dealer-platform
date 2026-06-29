import * as React from 'react';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface PaginationLinkItem {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps extends React.ComponentProps<'nav'> {
    links?: PaginationLinkItem[];
    currentPage?: number;
    lastPage?: number;
    baseUrl?: string;
}

function Pagination({ className, links, currentPage = 1, lastPage = 1, baseUrl = '?page=', ...props }: PaginationProps) {
    const generatedLinks: PaginationLinkItem[] = links ?? Array.from({ length: lastPage }, (_, index) => {
        const page = index + 1;
        return { url: `${baseUrl}${page}`, label: String(page), active: page === currentPage };
    });

    if (generatedLinks.length <= 1) return null;

    return (
        <nav role="navigation" aria-label="pagination" data-slot="pagination" className={cn('mx-auto flex w-full justify-center', className)} {...props}>
            <ul className="flex flex-row items-center gap-1">
                {generatedLinks.map((link, index) => {
                    const label = link.label.replace('&laquo;', '').replace('&raquo;', '').trim();
                    const isPrevious = link.label.includes('Previous') || link.label.includes('&laquo;');
                    const isNext = link.label.includes('Next') || link.label.includes('&raquo;');
                    const content = isPrevious ? <ChevronLeft className="size-4" /> : isNext ? <ChevronRight className="size-4" /> : label === '...' ? <MoreHorizontal className="size-4" /> : label;

                    return (
                        <li key={`${link.label}-${index}`}>
                            {link.url && label !== '...' ? (
                                <Button variant={link.active ? 'default' : 'outline'} size="icon" asChild aria-current={link.active ? 'page' : undefined} aria-label={isPrevious ? 'Go to previous page' : isNext ? 'Go to next page' : `Go to page ${label}`}>
                                    <Link href={link.url} preserveScroll preserveState>{content}</Link>
                                </Button>
                            ) : (
                                <Button variant="outline" size="icon" disabled aria-label={label === '...' ? 'More pages' : label}>{content}</Button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export { Pagination };
export type { PaginationLinkItem };
