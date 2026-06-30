import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import * as React from 'react';
import Lightbox from '@/components/shared/lightbox';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { VehicleGalleryImage } from '@/types/vehicle';

interface VehicleGalleryProps {
    images: VehicleGalleryImage[];
    className?: string;
}

export default function VehicleGallery({ images, className }: VehicleGalleryProps) {
    const sorted = [...images].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const active = sorted[activeIndex] ?? sorted[0];
    const shouldReduceMotion = useReducedMotion();

    const go = (direction: -1 | 1) => {
        setActiveIndex((i) => (i + direction + sorted.length) % sorted.length);
    };

    if (!active) {
return null;
}

    return (
        <div className={cn('space-y-4', className)}>
            <div className="group relative overflow-hidden rounded-2xl bg-muted">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active.id}
                        src={active.path}
                        alt={active.alt}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.02 }}
                        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                        transition={shouldReduceMotion ? undefined : { duration: 0.4, ease: 'easeOut' }}
                        className="aspect-[16/9] w-full object-cover"
                    />
                </AnimatePresence>

                {sorted.length > 1 && (
                    <>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => go(-1)}
                            aria-label="Previous vehicle image"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => go(1)}
                            aria-label="Next vehicle image"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </>
                )}

                <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
                    onClick={() => setLightboxOpen(true)}
                    aria-label="Open fullscreen vehicle gallery"
                >
                    <Expand className="h-4 w-4" />
                </Button>
            </div>

            {sorted.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {sorted.map((image, index) => (
                        <button
                            key={image.id}
                            type="button"
                            onClick={() => setActiveIndex(index)}
                            aria-label={`Show vehicle image ${index + 1}`}
                            className={cn(
                                'relative shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                                index === activeIndex ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100',
                            )}
                        >
                            <img src={image.path} alt={image.alt} loading="lazy" decoding="async" className="h-20 w-28 object-cover" />
                        </button>
                    ))}
                </div>
            )}

            <Lightbox
                open={lightboxOpen}
                onOpenChange={setLightboxOpen}
                index={activeIndex}
                onIndexChange={setActiveIndex}
                images={sorted.map((image) => ({ src: image.path, alt: image.alt }))}
            />
        </div>
    );
}
