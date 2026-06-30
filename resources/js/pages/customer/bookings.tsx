import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { Car } from 'lucide-react';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toSummary, mockVehicles } from '@/data/mock-vehicles';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import type { CustomerBooking } from '@/types/vehicle';

interface BookingsProps {
    bookings?: CustomerBooking[];
}

export default function BookingsPage({ bookings = [] }: BookingsProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const items: CustomerBooking[] = bookings.length
        ? bookings
        : [
              {
                  id: 1,
                  vehicle: toSummary(mockVehicles[0]),
                  scheduledAt: '2024-03-15T10:00:00',
                  status: 'confirmed',
                  notes: 'Please have the vehicle ready at the front lot.',
              },
          ];

    return (
        <DashboardLayout title="Test Drive Bookings" user={auth?.user}>
            <Head title="Test Drive Bookings" />

            <H2 className="mb-6">Test Drive Bookings</H2>

            {items.length === 0 ? (
                <EmptyState
                    icon={Car}
                    title="No test drives scheduled"
                    description="Book a test drive from any vehicle detail page."
                    action={<Button asChild><Link href="/inventory">Browse Inventory</Link></Button>}
                />
            ) : (
                <div className="space-y-4">
                    {items.map((b) => (
                        <Card key={b.id}>
                            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <img src={b.vehicle.image} alt={b.vehicle.name} className="h-16 w-24 rounded-lg object-cover" />
                                    <div>
                                        <p className="font-semibold">{b.vehicle.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(b.scheduledAt).toLocaleString()}
                                        </p>
                                        {b.notes && <p className="mt-1 text-xs text-muted-foreground">{b.notes}</p>}
                                    </div>
                                </div>
                                <Badge className="w-fit capitalize">{b.status}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
