import { Head, Link, router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import VehicleCard from '@/components/shared/vehicle-card';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

interface WishlistProps {
    vehicles: Array<{
        id: number;
        name: string;
        price: number;
        image: string | null;
        year: number;
        mileage: number;
        fuel_type: string;
        transmission: string;
        location: string | null;
    }>;
}

export default function WishlistPage({ vehicles }: WishlistProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const toggleWishlist = (vehicleId: number) => {
        router.post('/customer/wishlist', { vehicle_id: vehicleId }, {
            preserveScroll: true,
        });
    };

    const removeWishlist = (vehicleId: number) => {
        router.delete('/customer/wishlist', {
            data: { vehicle_id: vehicleId },
            preserveScroll: true,
        });
    };

    return (
        <DashboardLayout title="Wishlist" user={auth?.user}>
            <Head title="Wishlist" />
            <H2 className="mb-6">My Wishlist</H2>

            {vehicles.length === 0 ? (
                <EmptyState
                    icon={Heart}
                    title="Your wishlist is empty"
                    description="Save vehicles you love by clicking the heart icon."
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
                                isWishlisted: true,
                            }}
                            onWishlistToggle={() => removeWishlist(vehicle.id)}
                        />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
