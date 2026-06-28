import * as React from 'react';
import { cn } from '@/lib/utils';
import type { VehicleSpecificationGroup } from '@/types/vehicle';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface VehicleSpecsPanelProps {
    specifications: VehicleSpecificationGroup[];
    sticky?: boolean;
    className?: string;
}

export default function VehicleSpecsPanel({ specifications, sticky = true, className }: VehicleSpecsPanelProps) {
    if (specifications.length === 0) return null;

    return (
        <div className={cn(sticky && 'lg:sticky lg:top-24', className)}>
            <Card>
                <CardHeader>
                    <CardTitle>Specifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {specifications.map((group, index) => (
                        <div key={group.group}>
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                {group.group}
                            </h4>
                            <dl className="space-y-2">
                                {group.items.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <dt className="text-muted-foreground">{item.name}</dt>
                                        <dd className="font-medium">
                                            {item.value}
                                            {item.unit && <span className="ml-1 text-muted-foreground">{item.unit}</span>}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                            {index < specifications.length - 1 && <Separator className="mt-6" />}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
