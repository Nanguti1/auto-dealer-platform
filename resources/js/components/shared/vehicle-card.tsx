import * as React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Fuel, Gauge, Calendar, Users, ArrowRight } from 'lucide-react';
import WishlistButton from '@/components/vehicles/wishlist-button';
import CompareButton from '@/components/vehicles/compare-button';
import type { VehicleSummary } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: VehicleSummary;
  className?: string;
  onWishlistToggle?: (id: number) => void;
  onCompareToggle?: (id: number) => void;
  compareDisabled?: boolean;
}

export default function VehicleCard({
  vehicle,
  className,
  onWishlistToggle,
  onCompareToggle,
  compareDisabled = false,
}: VehicleCardProps) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

  const formatMileage = (mileage: number) => new Intl.NumberFormat('en-US').format(mileage);

  const getConditionColor = (condition?: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-500/10 text-green-600 hover:bg-green-500/20';
      case 'used':
        return 'bg-blue-500/10 text-blue-600 hover:bg-blue-500/20';
      case 'certified':
        return 'bg-purple-500/10 text-purple-600 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20';
    }
  };

  const href = `/inventory/${vehicle.slug ?? vehicle.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card className={cn('group overflow-hidden border-0 shadow-sm ring-1 ring-border/50 transition-all hover:-translate-y-1 hover:shadow-xl', className)}>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <Link href={href}>
            <img
              src={vehicle.image}
              alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
            {vehicle.featured ? (
              <Badge className="bg-primary text-primary-foreground shadow-sm">Featured</Badge>
            ) : (
              <span />
            )}
            {vehicle.condition && (
              <Badge variant="outline" className={cn('capitalize backdrop-blur-sm bg-background/80', getConditionColor(vehicle.condition))}>
                {vehicle.condition}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 right-3 flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            <WishlistButton
              size="sm"
              active={vehicle.isWishlisted}
              onToggle={() => onWishlistToggle?.(vehicle.id)}
            />
            <CompareButton
              size="sm"
              active={vehicle.isInCompare}
              disabled={compareDisabled && !vehicle.isInCompare}
              onToggle={() => onCompareToggle?.(vehicle.id)}
            />
          </div>
        </div>

        <CardContent className="p-5">
          <Link href={href} className="block space-y-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{vehicle.brand}</p>
              <h3 className="text-lg font-semibold leading-tight transition-colors group-hover:text-primary">
                {vehicle.year} {vehicle.model}
              </h3>
            </div>
            <p className="text-2xl font-bold tracking-tight">{formatPrice(vehicle.price)}</p>
          </Link>

          <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Gauge className="h-3.5 w-3.5 shrink-0" />
              <span>{formatMileage(vehicle.mileage)} mi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="h-3.5 w-3.5 shrink-0" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 shrink-0" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 shrink-0" />
              <span>{vehicle.seats} seats</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-5 pt-0">
          <Button asChild className="w-full group/btn">
            <Link href={href}>
              View Details
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
