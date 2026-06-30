import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';

export interface LightboxImage {
    src: string;
    alt: string;
}

interface LightboxProps {
    images: LightboxImage[];
    open: boolean;
    index: number;
    onOpenChange: (open: boolean) => void;
    onIndexChange?: (index: number) => void;
}

export default function Lightbox({ images, open, index, onOpenChange, onIndexChange }: LightboxProps) {
    const shouldReduceMotion = useReducedMotion();
    const image = images[index];

    React.useEffect(() => {
        if (!open) {
return;
}

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
onOpenChange(false);
}

            if (event.key === 'ArrowRight') {
onIndexChange?.((index + 1) % images.length);
}

            if (event.key === 'ArrowLeft') {
onIndexChange?.((index - 1 + images.length) % images.length);
}
        };

        document.addEventListener('keydown', onKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = '';
        };
    }, [images.length, index, onIndexChange, onOpenChange, open]);

    if (!image) {
return null;
}

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur-xl"
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Fullscreen media gallery"
                >
                    <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={() => onOpenChange(false)} aria-label="Close gallery">
                        <X className="size-5" />
                    </Button>

                    {images.length > 1 && (
                        <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2" onClick={() => onIndexChange?.((index - 1 + images.length) % images.length)} aria-label="Previous image">
                            <ChevronLeft className="size-6" />
                        </Button>
                    )}

                    <motion.img
                        key={image.src}
                        src={image.src}
                        alt={image.alt}
                        className="max-h-[86vh] max-w-[92vw] rounded-3xl object-contain shadow-2xl"
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    />

                    {images.length > 1 && (
                        <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2" onClick={() => onIndexChange?.((index + 1) % images.length)} aria-label="Next image">
                            <ChevronRight className="size-6" />
                        </Button>
                    )}

                    <p className="absolute bottom-4 text-sm text-muted-foreground">{index + 1} / {images.length}</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
