import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Clock } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import VehicleCard from '@/components/shared/vehicle-card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

interface Vehicle {
    id: number;
    name: string;
    price: number;
    image: string | null;
    year: number;
    mileage: number;
    fuel_type: string;
    transmission: string;
    location: string | null;
}

interface RecentlyViewedProps {
    vehicles: Vehicle[];
}

export default function RecentlyViewedPage({ vehicles }: RecentlyViewedProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const clearHistory = () => {
        router.delete('/customer/recently-viewed', {
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout title="Recently Viewed" user={auth?.user}>
            <Head title="Recently Viewed" />
            <div className="mb-6 flex items-center justify-between">
                <H2>Recently Viewed</H2>
                {vehicles.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearHistory}>Clear History</Button>
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
                    {vehicles.map((vehicle) => (
                        <VehicleCard
                            key={vehicle.id}
                            vehicle={{
                                id: vehicle.id,
                                name: vehicle.name,
                                price: vehicle.price,
                                image: vehicle.image,
                                year: vehicle.year,
                                mileage: vehicle.mileage,
                                fuelType: vehicle.fuel_type,
                                transmission: vehicle.transmission,
                                location: vehicle.location,
                            }}
                        />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
