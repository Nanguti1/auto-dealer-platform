import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Heart } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import VehicleCard from '@/components/shared/vehicle-card';
import { Button } from '@/components/ui/button';
import { findVehicleById, toSummary } from '@/data/mock-vehicles';
import { useWishlist } from '@/hooks/use-wishlist';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

export default function WishlistPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const { ids, toggle } = useWishlist();
    const vehicles = ids.map((id) => findVehicleById(id)).filter(Boolean);

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
                    {vehicles.map((v) => v && (
                        <VehicleCard
                            key={v.id}
                            vehicle={{ ...toSummary(v), isWishlisted: true }}
                            onWishlistToggle={() => toggle(v.id)}
                        />
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
