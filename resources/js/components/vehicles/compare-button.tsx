import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GitCompareArrows } from 'lucide-react';

interface CompareButtonProps {
    active?: boolean;
    disabled?: boolean;
    onToggle?: () => void;
    className?: string;
    size?: 'sm' | 'default';
}

export default function CompareButton({ active = false, disabled = false, onToggle, className, size = 'default' }: CompareButtonProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onToggle}
            disabled={disabled}
            aria-label={active ? 'Remove from compare' : 'Add to compare'}
            aria-pressed={active}
            className={cn(
                'bg-background/80 backdrop-blur hover:bg-background transition-colors',
                size === 'sm' ? 'h-8 w-8' : 'h-10 w-10',
                active && 'text-primary',
                className,
            )}
        >
            <GitCompareArrows className={cn('h-4 w-4', active && 'scale-110')} />
        </Button>
    );
}
