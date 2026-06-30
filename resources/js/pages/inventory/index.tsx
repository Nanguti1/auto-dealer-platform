import { Head, Link, router } from '@inertiajs/react';
import { GitCompareArrows, BookmarkPlus, Car, List, Grid3X3, RotateCcw } from 'lucide-react';
import * as React from 'react';
import { EmptyState } from '@/components/design-system';
import { H1, P } from '@/components/design-system/typography';
import VehicleCard from '@/components/shared/vehicle-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pagination } from '@/components/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    VehicleSearchBar,
    VehicleFiltersPanel,
    ActiveFilterTags,
    VehicleLoadingGrid,
} from '@/components/vehicles';
import { filterVehicles, mockFilterOptions } from '@/data/mock-vehicles';
import { useCompare } from '@/hooks/use-compare';
import { useSavedSearches } from '@/hooks/use-saved-searches';
import { useWishlist } from '@/hooks/use-wishlist';
import PublicLayout from '@/layouts/public/public-layout';
import type { FilterOptions, InventoryFilters, PaginatedVehicles, VehicleSummary } from '@/types/vehicle';

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
    const [viewMode, setViewMode] = React.useState<'grid' | 'list'>(() => {
        if (typeof window === 'undefined') {
return 'grid';
}

        return (localStorage.getItem('dealership:inventory-view') as 'grid' | 'list' | null) ?? 'grid';
    });
    const filters = serverFilters;
    const filterOptions = serverOptions ?? mockFilterOptions;
    const { toggle: toggleWishlist, isWishlisted } = useWishlist();
    const { toggle: toggleCompare, isInCompare, ids: compareIds, maxReached } = useCompare();
    const { save: saveSearch } = useSavedSearches();

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('dealership:inventory-filters', JSON.stringify(filters));
        }
    }, [filters]);

    React.useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('dealership:inventory-view', viewMode);
        }
    }, [viewMode]);

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
            preserveScroll: true,
            replace: true,
            onFinish: () => setLoading(false),
        });
    };

    const removeFilter = (key: keyof InventoryFilters) => {
        const next = { ...filters, [key]: undefined };
        applyFilters(next);
    };

    const handleSaveSearch = () => {
        const name = `Search ${new Date().toLocaleDateString()}`;
        saveSearch(name, filters, true);
    };

    const resetFilters = () => applyFilters({ sort: filters.sort });

    return (
        <PublicLayout title="Inventory" description="Browse premium new, pre-owned, certified, electric, luxury, and performance vehicles with smart filters, wishlist, and compare tools.">
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
                            <Button variant="outline" onClick={resetFilters}>
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Reset Filters
                            </Button>
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
                                <div className="flex flex-wrap items-center gap-3">
                                    <Tabs defaultValue={viewMode} value={viewMode} onValueChange={(value) => setViewMode(value as 'grid' | 'list')}>
                                        <TabsList aria-label="Inventory view">
                                            <TabsTrigger value="grid"><Grid3X3 className="size-4" /> Grid</TabsTrigger>
                                            <TabsTrigger value="list"><List className="size-4" /> List</TabsTrigger>
                                        </TabsList>
                                    </Tabs>
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
                                <>
                                    {viewMode === 'grid' ? (
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
                                    ) : (
                                        <div className="space-y-4">
                                            {vehicles.map((vehicle) => (
                                                <article key={vehicle.id} className="group grid gap-4 rounded-2xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-[240px_1fr_auto]">
                                                    <img src={vehicle.image} alt={vehicle.name} className="aspect-[4/3] w-full rounded-xl object-cover md:aspect-auto md:h-full" loading="lazy" />
                                                    <div className="space-y-2">
                                                        <Badge variant="secondary" className="capitalize">{vehicle.condition ?? 'available'}</Badge>
                                                        <h3 className="text-xl font-semibold group-hover:text-primary"><Link href={`/inventory/${vehicle.slug}`}>{vehicle.name}</Link></h3>
                                                        <p className="text-sm text-muted-foreground">{vehicle.year} • {vehicle.mileage.toLocaleString()} mi • {vehicle.fuelType} • {vehicle.transmission}</p>
                                                        <p className="text-2xl font-bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(vehicle.price)}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2 md:flex-col md:justify-center">
                                                        <Button asChild><Link href={`/inventory/${vehicle.slug}`}>View Details</Link></Button>
                                                        <Button variant="outline" onClick={() => toggleWishlist(vehicle.id)}>Wishlist</Button>
                                                    </div>
                                                </article>
                                            ))}
                                        </div>
                                    )}
                                    <Pagination className="mt-10" links={serverVehicles?.links} currentPage={serverVehicles?.current_page ?? 1} lastPage={serverVehicles?.last_page ?? 1} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
