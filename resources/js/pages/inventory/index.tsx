import * as React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import PublicLayout from '@/layouts/public/public-layout';
import VehicleCard from '@/components/shared/vehicle-card';
import {
    VehicleSearchBar,
    VehicleFiltersPanel,
    ActiveFilterTags,
    VehicleLoadingGrid,
} from '@/components/vehicles';
import { H1, P } from '@/components/design-system/typography';
import { EmptyState } from '@/components/design-system';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/hooks/use-wishlist';
import { useCompare } from '@/hooks/use-compare';
import { useSavedSearches } from '@/hooks/use-saved-searches';
import { filterVehicles, mockFilterOptions } from '@/data/mock-vehicles';
import type { FilterOptions, InventoryFilters, PaginatedVehicles, VehicleSummary } from '@/types/vehicle';
import { GitCompareArrows, BookmarkPlus, Car } from 'lucide-react';

interface InventoryIndexProps {
    vehicles?: PaginatedVehicles;
    filters?: InventoryFilters;
    filterOptions?: FilterOptions;
}

export default function InventoryIndex({
    vehicles: serverVehicles,
    filters: serverFilters = {},
    filterOptions: serverOptions,
}: InventoryIndexProps) {
    const [loading, setLoading] = React.useState(false);
    const filters = serverFilters;
    const filterOptions = serverOptions ?? mockFilterOptions;
    const { toggle: toggleWishlist, isWishlisted } = useWishlist();
    const { toggle: toggleCompare, isInCompare, ids: compareIds, maxReached } = useCompare();
    const { save: saveSearch } = useSavedSearches();

    const vehicles: VehicleSummary[] = React.useMemo(() => {
        const data = serverVehicles?.data ?? filterVehicles(filters as Record<string, string | number | undefined>);
        return data.map((v) => ({
            ...v,
            isWishlisted: v.isWishlisted ?? isWishlisted(v.id),
            isInCompare: v.isInCompare ?? isInCompare(v.id),
        }));
    }, [serverVehicles, filters, isWishlisted, isInCompare]);

    const applyFilters = (next: InventoryFilters) => {
        setLoading(true);
        router.get('/inventory', next as Record<string, string | number | undefined>, {
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    const removeFilter = (key: keyof InventoryFilters) => {
        const next = { ...filters, [key]: undefined };
        applyFilters(next);
    };

    const handleSaveSearch = () => {
        const name = `Search ${new Date().toLocaleDateString()}`;
        saveSearch(name, filters);
    };

    return (
        <PublicLayout title="Inventory">
            <Head title="Vehicle Inventory" />

            {/* Hero */}
            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
                <div className="container">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <Badge className="mb-3">Inventory</Badge>
                            <H1 className="mb-3">Browse Our Collection</H1>
                            <P className="max-w-xl">
                                Discover premium vehicles curated for performance, luxury, and value.
                            </P>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {compareIds.length > 0 && (
                                <Button variant="outline" asChild>
                                    <Link href="/inventory/compare">
                                        <GitCompareArrows className="mr-2 h-4 w-4" />
                                        Compare ({compareIds.length})
                                    </Link>
                                </Button>
                            )}
                            <Button variant="outline" onClick={handleSaveSearch}>
                                <BookmarkPlus className="mr-2 h-4 w-4" />
                                Save Search
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-10 md:py-14">
                <div className="container">
                    <div className="mb-6 space-y-4">
                        <VehicleSearchBar
                            defaultValue={filters.search}
                            onSearch={(search) => applyFilters({ ...filters, search: search || undefined })}
                        />
                        <ActiveFilterTags filters={filters} onRemove={removeFilter} />
                    </div>

                    <div className="grid gap-8 lg:grid-cols-4">
                        <aside className="lg:col-span-1">
                            <VehicleFiltersPanel filters={filters} options={filterOptions} onApply={applyFilters} />
                        </aside>

                        <div className="lg:col-span-3">
                            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-muted-foreground">
                                    {serverVehicles?.total ?? vehicles.length} vehicles found
                                </p>
                                <select
                                    value={filters.sort ?? 'newest'}
                                    onChange={(e) => applyFilters({ ...filters, sort: e.target.value })}
                                    className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="price_asc">Price: Low to High</option>
                                    <option value="price_desc">Price: High to Low</option>
                                    <option value="mileage_asc">Mileage: Low to High</option>
                                </select>
                            </div>

                            {loading ? (
                                <VehicleLoadingGrid />
                            ) : vehicles.length === 0 ? (
                                <EmptyState
                                    icon={Car}
                                    title="No vehicles found"
                                    description="Try adjusting your filters or search terms."
                                    action={
                                        <Button variant="outline" onClick={() => applyFilters({})}>
                                            Clear Filters
                                        </Button>
                                    }
                                />
                            ) : (
                                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                    {vehicles.map((vehicle) => (
                                        <VehicleCard
                                            key={vehicle.id}
                                            vehicle={vehicle}
                                            onWishlistToggle={toggleWishlist}
                                            onCompareToggle={toggleCompare}
                                            compareDisabled={maxReached}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
