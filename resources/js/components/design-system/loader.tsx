import * as React from 'react';
import { cn } from '@/lib/utils';

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeVariants = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

function Loader({ className, size = 'md', ...props }: LoaderProps) {
  return (
    <div
      className={cn('animate-spin rounded-full border-2 border-current border-t-transparent', sizeVariants[size], className)}
      {...props}
    />
  );
}

function DotsLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex gap-1', className)} {...props}>
      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-current" />
    </div>
  );
}

function BarLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-1 w-full animate-pulse rounded-full bg-current', className)}
      {...props}
    />
  );
}

function PulseLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('h-8 w-8 animate-pulse rounded-full bg-current', className)}
      {...props}
    />
  );
}

export { Loader, DotsLoader, BarLoader, PulseLoader };
