import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'table' | 'chart';
}

export function LoadingSkeleton({ className, variant = 'default' }: LoadingSkeletonProps) {
  return (
    <div className={cn('animate-pulse', className)}>
      {variant === 'card' && (
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-4 bg-muted rounded w-5/6" />
        </div>
      )}
      {variant === 'table' && (
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
          <div className="h-10 bg-muted rounded" />
        </div>
      )}
      {variant === 'chart' && (
        <div className="h-64 bg-muted rounded-lg" />
      )}
      {variant === 'default' && (
        <div className="h-8 bg-muted rounded w-full" />
      )}
    </div>
  );
}

interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = 'Loading...' }: PageLoadingProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
