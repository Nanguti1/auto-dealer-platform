import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Fuel, Gauge, Calendar, Users } from 'lucide-react';

interface VehicleCardProps {
  vehicle: {
    id: string | number;
    name: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    seats: number;
    image: string;
    condition?: 'new' | 'used' | 'certified';
    featured?: boolean;
  };
  className?: string;
}

export default function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('en-US').format(mileage);
  };

  const getConditionColor = (condition?: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-500/10 text-green-500 hover:bg-green-500/20';
      case 'used':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
      case 'certified':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20';
      default:
        return 'bg-gray-500/10 text-gray-500 hover:bg-gray-500/20';
    }
  };

  return (
    <Card className={cn('group overflow-hidden transition-all hover:shadow-lg', className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={vehicle.image}
          alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        {vehicle.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        {vehicle.condition && (
          <Badge
            variant="outline"
            className={cn('absolute top-3 right-3 capitalize', getConditionColor(vehicle.condition))}
          >
            {vehicle.condition}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-3 right-3 h-8 w-8 bg-background/80 backdrop-blur hover:bg-background"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg leading-tight mb-1">
            {vehicle.year} {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-2xl font-bold text-primary">{formatPrice(vehicle.price)}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{formatMileage(vehicle.mileage)} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4" />
            <span>{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{vehicle.seats} seats</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/inventory/${vehicle.id}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
