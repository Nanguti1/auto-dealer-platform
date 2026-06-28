import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { EmptyState } from '@/components/design-system';
import { H2 } from '@/components/design-system/typography';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { CustomerNotification } from '@/types/vehicle';
import { Bell } from 'lucide-react';

interface NotificationsProps {
    notifications?: CustomerNotification[];
}

export default function NotificationsPage({ notifications = [] }: NotificationsProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    const items: CustomerNotification[] = notifications.length
        ? notifications
        : [
              { id: 1, title: 'Price Drop Alert', message: 'Tesla Model S price reduced by $2,000', read: false, createdAt: '2024-03-01T10:00:00Z' },
              { id: 2, title: 'New Match Found', message: 'A BMW X5 matching your saved search is now available.', read: false, createdAt: '2024-02-28T14:30:00Z' },
              { id: 3, title: 'Reservation Confirmed', message: 'Your reservation for the Porsche 911 has been confirmed.', read: true, createdAt: '2024-02-25T09:00:00Z' },
          ];

    return (
        <DashboardLayout title="Notifications" user={auth?.user}>
            <Head title="Notifications" />

            <H2 className="mb-6">Notifications</H2>

            {items.length === 0 ? (
                <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
            ) : (
                <div className="space-y-3">
                    {items.map((n) => (
                        <Card key={n.id} className={!n.read ? 'ring-1 ring-primary/20' : ''}>
                            <CardContent className="flex items-start gap-4 p-5">
                                <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-muted' : 'bg-primary'}`} />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold">{n.title}</p>
                                        {!n.read && <Badge variant="secondary" className="text-xs">New</Badge>}
                                    </div>
                                    <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        {new Date(n.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </DashboardLayout>
    );
}
