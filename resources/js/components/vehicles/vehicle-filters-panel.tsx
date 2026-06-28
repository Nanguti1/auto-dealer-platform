import * as React from 'react';
import { router } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import type { FilterOptions, InventoryFilters } from '@/types/vehicle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { SlidersHorizontal, X } from 'lucide-react';

interface VehicleFiltersPanelProps {
    filters: InventoryFilters;
    options: FilterOptions;
    onApply?: (filters: InventoryFilters) => void;
    className?: string;
}

function FilterSelect({
    label,
    value,
    options,
    onChange,
}: {
    label: string;
    value?: string;
    options: { value: string; label: string; count?: number }[];
    onChange: (value: string) => void;
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <select
                value={value ?? ''}
                onChange={(e) => onChange(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
                <option value="">All</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                        {opt.count !== undefined ? ` (${opt.count})` : ''}
                    </option>
                ))}
            </select>
        </div>
    );
}

function FilterForm({
    filters,
    options,
    onApply,
    onClose,
}: {
    filters: InventoryFilters;
    options: FilterOptions;
    onApply: (filters: InventoryFilters) => void;
    onClose?: () => void;
}) {
    const [local, setLocal] = React.useState<InventoryFilters>(filters);

    const apply = () => {
        onApply(local);
        onClose?.();
    };

    const reset = () => {
        const cleared: InventoryFilters = { sort: filters.sort };
        setLocal(cleared);
        onApply(cleared);
        onClose?.();
    };

    return (
        <div className="space-y-5">
            <FilterSelect
                label="Make"
                value={local.make}
                options={options.makes}
                onChange={(make) => setLocal((f) => ({ ...f, make: make || undefined }))}
            />
            <FilterSelect
                label="Body Type"
                value={local.bodyType}
                options={options.bodyTypes}
                onChange={(bodyType) => setLocal((f) => ({ ...f, bodyType: bodyType || undefined }))}
            />
            <FilterSelect
                label="Fuel Type"
                value={local.fuelType}
                options={options.fuelTypes}
                onChange={(fuelType) => setLocal((f) => ({ ...f, fuelType: fuelType || undefined }))}
            />
            <FilterSelect
                label="Condition"
                value={local.condition}
                options={options.conditions}
                onChange={(condition) => setLocal((f) => ({ ...f, condition: condition || undefined }))}
            />
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label>Min Price</Label>
                    <Input
                        type="number"
                        placeholder="0"
                        value={local.minPrice ?? ''}
                        onChange={(e) => setLocal((f) => ({ ...f, minPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Max Price</Label>
                    <Input
                        type="number"
                        placeholder="200000"
                        value={local.maxPrice ?? ''}
                        onChange={(e) => setLocal((f) => ({ ...f, maxPrice: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <Label>Min Year</Label>
                    <Input
                        type="number"
                        placeholder="2018"
                        value={local.minYear ?? ''}
                        onChange={(e) => setLocal((f) => ({ ...f, minYear: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                </div>
                <div className="space-y-2">
                    <Label>Max Year</Label>
                    <Input
                        type="number"
                        placeholder="2025"
                        value={local.maxYear ?? ''}
                        onChange={(e) => setLocal((f) => ({ ...f, maxYear: e.target.value ? Number(e.target.value) : undefined }))}
                    />
                </div>
            </div>
            <div className="flex gap-2 pt-2">
                <Button className="flex-1" onClick={apply}>
                    Apply Filters
                </Button>
                <Button variant="outline" onClick={reset}>
                    Reset
                </Button>
            </div>
        </div>
    );
}

export default function VehicleFiltersPanel({ filters, options, onApply, className }: VehicleFiltersPanelProps) {
    const apply = (next: InventoryFilters) => {
        if (onApply) {
            onApply(next);
            return;
        }
        router.get('/inventory', next as Record<string, string | number>, { preserveState: true, preserveScroll: true });
    };

    const activeCount = Object.entries(filters).filter(
        ([key, val]) => val !== undefined && val !== '' && key !== 'sort' && key !== 'search',
    ).length;

    return (
        <div className={cn(className)}>
            {/* Desktop sidebar */}
            <div className="hidden lg:block">
                <div className="rounded-xl border bg-card p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="font-semibold">Filters</h3>
                        {activeCount > 0 && (
                            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                {activeCount} active
                            </span>
                        )}
                    </div>
                    <FilterForm filters={filters} options={options} onApply={apply} />
                </div>
            </div>

            {/* Mobile sheet */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="w-full">
                            <SlidersHorizontal className="mr-2 h-4 w-4" />
                            Filters
                            {activeCount > 0 && ` (${activeCount})`}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Filter Vehicles</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6">
                            <FilterForm filters={filters} options={options} onApply={apply} />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export function ActiveFilterTags({
    filters,
    onRemove,
    className,
}: {
    filters: InventoryFilters;
    onRemove: (key: keyof InventoryFilters) => void;
    className?: string;
}) {
    const tags = Object.entries(filters).filter(
        ([key, val]) => val !== undefined && val !== '' && key !== 'sort',
    );

    if (tags.length === 0) return null;

    return (
        <div className={cn('flex flex-wrap gap-2', className)}>
            {tags.map(([key, val]) => (
                <button
                    key={key}
                    type="button"
                    onClick={() => onRemove(key as keyof InventoryFilters)}
                    className="inline-flex items-center gap-1 rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize transition-colors hover:bg-muted/80"
                >
                    {key}: {String(val)}
                    <X className="h-3 w-3" />
                </button>
            ))}
        </div>
    );
}
