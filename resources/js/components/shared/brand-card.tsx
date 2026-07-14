import { Link } from '@inertiajs/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

interface BrandCardProps {
  brand: {
    id: string | number;
    name: string;
    logo: string;
    vehicleCount?: number;
  };
  className?: string;
}

export default function BrandCard({ brand, className }: BrandCardProps) {
  return (
    <Link href={`/inventory?brand=${brand.id}`}>
      <div
        className={cn(
          'group relative h-40 w-full rounded-lg border bg-card transition-all hover:shadow-lg hover:border-primary cursor-pointer overflow-hidden',
          className
        )}
      >
        {brand.logo && brand.logo.trim() !== '' ? (
          <img
            src={brand.logo}
            alt={brand.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">{brand.name}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
          {brand.vehicleCount !== undefined && (
            <p className="text-sm text-white/80">
              {brand.vehicleCount} vehicles
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
