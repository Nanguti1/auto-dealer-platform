import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { CalendarCheck } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';

interface Vehicle {
    id: number;
    name: string;
    image: string | null;
    price: number;
}

interface Reservation {
    id: number;
    vehicle: Vehicle;
    depositAmount: number;
    status: string;
    expiresAt: string | null;
}

interface ReservationsProps {
    reservations: Reservation[];
}

export default function ReservationsPage({ reservations }: ReservationsProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const formatPrice = (n: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    return (
        <DashboardLayout title="Reservations" user={auth?.user}>
            <Head title="Reservations" />

            <H2 className="mb-6">My Reservations</H2>

            {reservations.length === 0 ? (
                <EmptyState
                    icon={CalendarCheck}
                    title="No reservations"
                    description="Reserve a vehicle to hold it while you finalize your purchase."
                    action={<Button asChild><Link href="/inventory">Browse Inventory</Link></Button>}
                />
            ) : (
                <div className="space-y-4">
                    {reservations.map((r) => (
                        <Card key={r.id}>
                            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={r.vehicle.image || ''} alt={r.vehicle.name} className="h-16 w-24 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-semibold">{r.vehicle.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Deposit: {formatPrice(r.depositAmount)}
                                        </p>
                                        {r.expiresAt && (
                                            <p className="text-xs text-muted-foreground">Expires: {r.expiresAt}</p>
                                        )}
                                    </div>
                                </div>
                                <Badge className="w-fit capitalize">{r.status}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
