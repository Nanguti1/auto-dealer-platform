import { Head, Link } from '@inertiajs/react';
import { GitCompareArrows, ArrowLeft } from 'lucide-react';
import * as React from 'react';
import { EmptyState } from '@/components/design-system';
import { H1, P } from '@/components/design-system/typography';
import { Button } from '@/components/ui/button';
import { VehicleComparisonTable } from '@/components/vehicles';
import { useCompare } from '@/hooks/use-compare';
import PublicLayout from '@/layouts/public/public-layout';
import type { VehicleDetail } from '@/types/vehicle';

interface ComparePageProps {
    vehicles?: VehicleDetail[];
}

export default function ComparePage({ vehicles: serverVehicles }: ComparePageProps) {
    const { ids, remove, clear } = useCompare();

    const vehicles = React.useMemo(() => {
        // If server provides vehicles, use those
        if (serverVehicles?.length) {
            return serverVehicles;
        }

        // Otherwise, the compare hook should handle everything client-side
        // The vehicles are stored in localStorage by the useCompare hook
        return [];
    }, [serverVehicles, ids]);

    return (
        <PublicLayout title="Compare Vehicles" description="Compare selected vehicles side by side across pricing, specifications, features, performance, and ownership details.">
            <Head title="Compare Vehicles" />

            <section className="py-12 md:py-16">
                <div className="container">
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <Button variant="ghost" size="sm" asChild className="mb-4 -ml-2">
                                <Link href="/inventory">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Inventory
                                </Link>
                            </Button>
                            <H1 className="mb-2">Compare Vehicles</H1>
                            <P>Side-by-side comparison of up to 4 vehicles.</P>
                        </div>
                        {vehicles.length > 0 && (
                            <Button variant="outline" onClick={clear}>
                                Clear All
                            </Button>
                        )}
                    </div>

                    {vehicles.length === 0 ? (
                        <EmptyState
                            icon={GitCompareArrows}
                            title="No vehicles to compare"
                            description="Add vehicles from the inventory page to start comparing."
                            action={
                                <Button asChild>
                                    <Link href="/inventory">Browse Inventory</Link>
                                </Button>
                            }
                        />
                    ) : (
                        <VehicleComparisonTable vehicles={vehicles} onRemove={remove} />
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}
