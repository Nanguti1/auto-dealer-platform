import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

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
      <Card
        className={cn(
          'group transition-all hover:shadow-lg hover:border-primary cursor-pointer',
          className
        )}
      >
        <CardContent className="flex flex-col items-center justify-center p-6">
          <div className="relative h-20 w-20 mb-4">
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-full w-full object-contain transition-transform group-hover:scale-110"
            />
          </div>
          <h3 className="font-semibold text-lg mb-1">{brand.name}</h3>
          {brand.vehicleCount !== undefined && (
            <p className="text-sm text-muted-foreground">
              {brand.vehicleCount} vehicles
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
