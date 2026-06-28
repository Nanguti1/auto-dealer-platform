import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import VehicleCard from '@/components/shared/vehicle-card';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import { Button } from '@/components/ui/button';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { findVehicleById, toSummary } from '@/data/mock-vehicles';
import { Clock } from 'lucide-react';

export default function RecentlyViewedPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const { ids, clear } = useRecentlyViewed();
    const vehicles = ids.map((id) => findVehicleById(id)).filter(Boolean);

    return (
        <DashboardLayout title="Recently Viewed" user={auth?.user}>
            <Head title="Recently Viewed" />
            <div className="mb-6 flex items-center justify-between">
                <H2>Recently Viewed</H2>
                {vehicles.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clear}>Clear History</Button>
                )}
            </div>

            {vehicles.length === 0 ? (
                <EmptyState
                    icon={Clock}
                    title="No recently viewed vehicles"
                    description="Vehicles you view will appear here."
                    action={<Button asChild><Link href="/inventory">Browse Inventory</Link></Button>}
                />
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {vehicles.map((v) => v && <VehicleCard key={v.id} vehicle={toSummary(v)} />)}
                </div>
            )}
        </DashboardLayout>
    );
}
