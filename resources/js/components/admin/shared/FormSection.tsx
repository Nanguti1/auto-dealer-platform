import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4;
  fullWidth?: boolean;
}

export default function FormSection({
  title,
  description,
  children,
  className = '',
  gridCols = 1,
  fullWidth = false,
}: FormSectionProps) {
  const gridClass = fullWidth ? '' : `md:grid-cols-${gridCols}`;

  return (
    <Card className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </CardHeader>
      )}
      <CardContent>
        <div className={`grid gap-4 ${gridClass}`}>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
