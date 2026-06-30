import { Rotate3d } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Vehicle360ViewerProps {
    className?: string;
    imageUrl?: string;
}

export default function Vehicle360Viewer({ className, imageUrl }: Vehicle360ViewerProps) {
    return (
        <Card className={cn('overflow-hidden border-dashed', className)}>
            <CardContent className="relative flex aspect-[16/9] flex-col items-center justify-center gap-4 bg-muted/30 p-8 text-center">
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="360 viewer preview"
                        className="absolute inset-0 h-full w-full object-cover opacity-20"
                    />
                )}
                <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Rotate3d className="h-8 w-8 text-primary" />
                    </div>
                    <Badge variant="secondary">Coming Soon</Badge>
                    <h3 className="text-xl font-semibold">360° Interactive Viewer</h3>
                    <p className="max-w-md text-sm text-muted-foreground">
                        Explore every angle of this vehicle with our immersive 360° viewer. Full interactive experience launching soon.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
