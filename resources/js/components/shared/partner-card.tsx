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
        'group relative h-32 w-full rounded-lg border bg-card transition-all hover:shadow-lg hover:border-primary cursor-pointer overflow-hidden',
        className
      )}
    >
      {partner.logo && partner.logo.trim() !== '' ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
          <span className="text-muted-foreground">{partner.name}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="font-semibold text-lg">{partner.name}</h3>
      </div>
    </div>
  );

  if (partner.website) {
    return (
      <a href={partner.website} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return content;
}
