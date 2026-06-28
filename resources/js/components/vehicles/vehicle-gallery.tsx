import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { VehicleGalleryImage } from '@/types/vehicle';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface VehicleGalleryProps {
    images: VehicleGalleryImage[];
    className?: string;
}

export default function VehicleGallery({ images, className }: VehicleGalleryProps) {
    const sorted = [...images].sort((a, b) => Number(b.isPrimary) - Number(a.isPrimary));
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [lightboxOpen, setLightboxOpen] = React.useState(false);
    const active = sorted[activeIndex] ?? sorted[0];

    const go = (direction: -1 | 1) => {
        setActiveIndex((i) => (i + direction + sorted.length) % sorted.length);
    };

    if (!active) return null;

    return (
        <div className={cn('space-y-4', className)}>
            <div className="group relative overflow-hidden rounded-2xl bg-muted">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={active.id}
                        src={active.path}
                        alt={active.alt}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
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
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
                            onClick={() => go(1)}
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
                            className={cn(
                                'relative shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                                index === activeIndex ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100',
                            )}
                        >
                            <img src={image.path} alt={image.alt} className="h-20 w-28 object-cover" />
                        </button>
                    ))}
                </div>
            )}

            <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
                <DialogContent className="max-w-5xl border-none bg-black/95 p-2 sm:p-4">
                    <img src={active.path} alt={active.alt} className="max-h-[85vh] w-full object-contain" />
                </DialogContent>
            </Dialog>
        </div>
    );
}
