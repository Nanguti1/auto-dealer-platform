import type { LucideIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface StatisticCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  description?: string;
  className?: string;
}

export default function StatisticCard({
  icon: Icon,
  value,
  label,
  description,
  className,
}: StatisticCardProps) {
  return (
    <div className={cn('text-center', className)}>
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <div className="text-4xl md:text-5xl font-bold mb-2">{value}</div>
      <div className="text-lg font-semibold mb-1">{label}</div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
