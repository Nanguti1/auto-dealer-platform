import { Heart } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
    active?: boolean;
    onToggle?: () => void;
    className?: string;
    size?: 'sm' | 'default';
}

export default function WishlistButton({ active = false, onToggle, className, size = 'default' }: WishlistButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggle}
            aria-label={active ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={active}
            className={cn(
                'bg-background/80 backdrop-blur hover:bg-background transition-colors',
                size === 'sm' ? 'h-8 w-8' : 'h-10 w-10',
                active && 'text-red-500 hover:text-red-600',
                className,
            )}
        >
            <Heart className={cn('h-4 w-4 transition-transform', active && 'fill-current scale-110')} />
        </Button>
    );
}
