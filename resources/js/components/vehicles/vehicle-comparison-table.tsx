import { Link } from '@inertiajs/react';
import { Check, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VehicleDetail } from '@/types/vehicle';

interface VehicleComparisonTableProps {
    vehicles: VehicleDetail[];
    onRemove?: (id: number) => void;
    className?: string;
}

function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
}

function formatMileage(mileage: number): string {
    return new Intl.NumberFormat('en-US').format(mileage);
}

type Row = {
    label: string;
    getValue: (v: VehicleDetail) => string | number | boolean | null | undefined;
    highlight?: boolean;
};

const rows: Row[] = [
    { label: 'Price', getValue: (v) => formatPrice(v.price), highlight: true },
    { label: 'Year', getValue: (v) => v.year },
    { label: 'Mileage', getValue: (v) => `${formatMileage(v.mileage)} mi` },
    { label: 'Condition', getValue: (v) => v.condition ?? '—' },
    { label: 'Fuel Type', getValue: (v) => v.fuelType },
    { label: 'Transmission', getValue: (v) => v.transmission },
    { label: 'Body Type', getValue: (v) => v.bodyType ?? '—' },
    { label: 'Drive Type', getValue: (v) => v.driveType ?? '—' },
    { label: 'Engine', getValue: (v) => v.engineType ?? '—' },
    { label: 'Exterior Color', getValue: (v) => v.color ?? '—' },
    { label: 'Interior Color', getValue: (v) => v.interiorColor ?? '—' },
    { label: 'Seats', getValue: (v) => v.seats },
];

export default function VehicleComparisonTable({ vehicles, onRemove, className }: VehicleComparisonTableProps) {
    if (vehicles.length === 0) {
        return null;
    }

    return (
        <div className={cn('overflow-x-auto rounded-xl border', className)}>
            <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                    <tr className="border-b bg-muted/50">
                        <th className="sticky left-0 z-10 bg-muted/50 p-4 text-left font-semibold">Compare</th>
                        {vehicles.map((vehicle) => (
                            <th key={vehicle.id} className="min-w-[200px] p-4 text-left align-top">
                                <div className="space-y-3">
                                    <img
                                        src={vehicle.image}
                                        alt={vehicle.name}
                                        className="aspect-[4/3] w-full rounded-lg object-cover"
                                    />
                                    <div>
                                        <p className="font-semibold leading-tight">{vehicle.name}</p>
                                        <p className="text-lg font-bold text-primary">{formatPrice(vehicle.price)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" asChild className="flex-1">
                                            <Link href={`/inventory/${vehicle.slug}`}>View</Link>
                                        </Button>
                                        {onRemove && (
                                            <Button size="sm" variant="outline" onClick={() => onRemove(vehicle.id)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.label} className="border-b transition-colors hover:bg-muted/30">
                            <td className="sticky left-0 z-10 bg-background p-4 font-medium text-muted-foreground">
                                {row.label}
                            </td>
                            {vehicles.map((vehicle) => {
                                const value = row.getValue(vehicle);

                                return (
                                    <td
                                        key={vehicle.id}
                                        className={cn('p-4', row.highlight && 'font-semibold text-primary')}
                                    >
                                        {typeof value === 'boolean' ? (
                                            value ? (
                                                <Check className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <Minus className="h-5 w-5 text-muted-foreground" />
                                            )
                                        ) : (
                                            String(value ?? '—')
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
