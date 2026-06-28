import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface VehicleLoadingGridProps {
    count?: number;
    className?: string;
}

export default function VehicleLoadingGrid({ count = 6, className }: VehicleLoadingGridProps) {
    return (
        <div className={cn('grid gap-6 sm:grid-cols-2 lg:grid-cols-3', className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="overflow-hidden rounded-xl border bg-card">
                    <Skeleton className="aspect-[4/3] w-full rounded-none" />
                    <div className="space-y-3 p-4">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-7 w-1/2" />
                        <div className="grid grid-cols-2 gap-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            ))}
        </div>
    );
}
