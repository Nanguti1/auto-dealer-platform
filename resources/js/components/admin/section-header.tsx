import * as React from 'react';
import { H3, P } from '@/components/design-system/typography';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-2 md:flex-row md:items-center md:justify-between', className)}>
      <div className="space-y-1">
        <H3>{title}</H3>
        {subtitle ? <P className="text-sm text-muted-foreground">{subtitle}</P> : null}
      </div>
      {action ? <div className="flex items-center">{action}</div> : null}
    </div>
  );
}
