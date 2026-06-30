import { ChevronLeft, ChevronRight } from 'lucide-react';
import * as React from 'react';
import VehicleCard from '@/components/shared/vehicle-card';
import { Button } from '@/components/ui/button';
import type { VehicleSummary } from '@/types/vehicle';

interface VehicleCarouselProps {
    vehicles: VehicleSummary[];
    title?: string;
}

export default function VehicleCarousel({ vehicles, title = 'Featured vehicles' }: VehicleCarouselProps) {
    const scrollerRef = React.useRef<HTMLDivElement>(null);

    const scrollBy = (direction: -1 | 1) => {
        scrollerRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' });
    };

    if (vehicles.length === 0) {
return null;
}

    return (
        <section aria-label={title} className="space-y-4">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <div className="flex gap-2">
                    <Button type="button" variant="outline" size="icon" onClick={() => scrollBy(-1)} aria-label="Previous vehicles"><ChevronLeft className="size-4" /></Button>
                    <Button type="button" variant="outline" size="icon" onClick={() => scrollBy(1)} aria-label="Next vehicles"><ChevronRight className="size-4" /></Button>
                </div>
            </div>
            <div ref={scrollerRef} className="flex snap-x gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="min-w-[290px] snap-start sm:min-w-[340px]">
                        <VehicleCard vehicle={vehicle} />
                    </div>
                ))}
            </div>
        </section>
    );
}
