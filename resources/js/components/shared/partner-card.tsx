import { Link } from '@inertiajs/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface PartnerCardProps {
  partner: {
    id: string | number;
    name: string;
    logo: string;
    website?: string;
  };
  className?: string;
}

export default function PartnerCard({ partner, className }: PartnerCardProps) {
  const content = (
    <div
      className={cn(
        'flex items-center justify-center p-6 bg-muted/50 rounded-lg transition-all hover:bg-muted hover:shadow-md',
        className
      )}
    >
      <img
        src={partner.logo}
        alt={partner.name}
        className="h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
      />
    </div>
  );

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
