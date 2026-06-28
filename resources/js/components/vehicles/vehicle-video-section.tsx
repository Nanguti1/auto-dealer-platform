import * as React from 'react';
import { cn } from '@/lib/utils';
import type { VehicleVideo } from '@/types/vehicle';
import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface VehicleVideoSectionProps {
    videos: VehicleVideo[];
    className?: string;
}

function getEmbedUrl(url: string): string {
    if (url.includes('youtube.com/embed') || url.includes('youtu.be')) return url;
    return url;
}

export default function VehicleVideoSection({ videos, className }: VehicleVideoSectionProps) {
    const [activeId, setActiveId] = React.useState(videos[0]?.id);

    if (videos.length === 0) return null;

    const active = videos.find((v) => v.id === activeId) ?? videos[0];

    return (
        <section className={cn('space-y-6', className)}>
            <h2 className="text-2xl font-bold tracking-tight">Videos</h2>
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="overflow-hidden rounded-2xl bg-black aspect-video">
                        <iframe
                            src={getEmbedUrl(active.url)}
                            title={active.title}
                            className="h-full w-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
                <div className="space-y-3">
                    {videos.map((video) => (
                        <Card
                            key={video.id}
                            className={cn(
                                'cursor-pointer transition-all hover:shadow-md',
                                video.id === active.id && 'ring-2 ring-primary',
                            )}
                            onClick={() => setActiveId(video.id)}
                        >
                            <CardContent className="flex items-center gap-3 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <Play className="h-4 w-4 fill-current" />
                                </div>
                                <div>
                                    <p className="font-medium">{video.title}</p>
                                    {video.provider && (
                                        <p className="text-xs capitalize text-muted-foreground">{video.provider}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
