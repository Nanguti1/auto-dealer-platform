import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface VehicleLoadingDetailProps {
    className?: string;
}

export default function VehicleLoadingDetail({ className }: VehicleLoadingDetailProps) {
    return (
        <div className={cn('animate-pulse', className)}>
            <Skeleton className="mb-8 aspect-[16/9] w-full rounded-2xl" />
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                    <Skeleton className="h-10 w-2/3" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                    <Skeleton className="h-5 w-4/6" />
                    <div className="grid grid-cols-4 gap-3 pt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="aspect-[4/3] rounded-lg" />
                        ))}
                    </div>
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                </div>
            </div>
        </div>
    );
}
