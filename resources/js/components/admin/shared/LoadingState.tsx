import * as React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingStateProps {
  message?: string;
  variant?: 'full-page' | 'inline' | 'skeleton' | 'spinner';
  className?: string;
}

export function LoadingState({ 
  message = 'Loading...', 
  variant = 'full-page',
  className 
}: LoadingStateProps) {
  if (variant === 'full-page') {
    return (
      <div className={cn('flex items-center justify-center min-h-[400px]', className)} role="status" aria-live="polite" aria-label={message}>
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center justify-center py-8', className)} role="status" aria-live="polite" aria-label={message}>
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">{message}</span>
        </div>
      </div>
    );
  }

  if (variant === 'spinner') {
    return (
      <div className={cn('flex items-center justify-center', className)} role="status" aria-live="polite" aria-label="Loading">
        <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden="true" />
      </div>
    );
  }

  // skeleton variant
  return (
    <div className={cn('space-y-3 animate-pulse', className)} role="status" aria-live="polite" aria-label="Loading content">
      <div className="h-4 bg-muted rounded w-3/4" aria-hidden="true" />
      <div className="h-4 bg-muted rounded w-1/2" aria-hidden="true" />
      <div className="h-4 bg-muted rounded w-5/6" aria-hidden="true" />
    </div>
  );
}

interface TableLoadingProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export function TableLoading({ rows = 5, columns = 4, className }: TableLoadingProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-muted rounded animate-pulse" />
      ))}
    </div>
  );
}

interface CardLoadingProps {
  count?: number;
  className?: string;
}

export function CardLoading({ count = 3, className }: CardLoadingProps) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

interface ChartLoadingProps {
  height?: number;
  className?: string;
}

export function ChartLoading({ height = 260, className }: ChartLoadingProps) {
  return (
    <div 
      className={cn('bg-muted rounded-lg animate-pulse', className)}
      style={{ height: `${height}px` }}
    />
  );
}
