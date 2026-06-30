import { Head, Link, usePage } from '@inertiajs/react';
import { Car, Heart, GitCompareArrows, Clock, Bell, Calendar, FileText } from 'lucide-react';
import * as React from 'react';
import { H2, P } from '@/components/design-system/typography';
import VehicleCard from '@/components/shared/vehicle-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { findVehicleById, toSummary } from '@/data/mock-vehicles';
import { useCompare } from '@/hooks/use-compare';
import { useRecentlyViewed } from '@/hooks/use-recently-viewed';
import { useWishlist } from '@/hooks/use-wishlist';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import type { CustomerNotification, CustomerReservation, CustomerBooking } from '@/types/vehicle';

interface DashboardProps {
    reservations?: CustomerReservation[];
    bookings?: CustomerBooking[];
    notifications?: CustomerNotification[];
}

export default function CustomerDashboard({
    reservations = [],
    bookings = [],
    notifications = [],
}: DashboardProps) {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const { ids: wishlistIds } = useWishlist();
    const { ids: compareIds } = useCompare();
    const { ids: recentIds } = useRecentlyViewed();

    const recentVehicles = recentIds.map((id) => findVehicleById(id)).filter(Boolean).slice(0, 3);

    const mockNotifications: CustomerNotification[] = notifications.length
        ? notifications
        : [
              { id: 1, title: 'Price Drop Alert', message: 'Tesla Model S price reduced by $2,000', read: false, createdAt: '2024-03-01' },
              { id: 2, title: 'New Match', message: 'A vehicle matching your saved search is available', read: true, createdAt: '2024-02-28' },
          ];

    const stats = [
        { label: 'Wishlist', value: wishlistIds.length, icon: Heart, href: '/customer/wishlist' },
        { label: 'Compare', value: compareIds.length, icon: GitCompareArrows, href: '/inventory/compare' },
        { label: 'Recently Viewed', value: recentIds.length, icon: Clock, href: '/customer/recently-viewed' },
        { label: 'Notifications', value: mockNotifications.filter((n) => !n.read).length, icon: Bell, href: '/customer/notifications' },
    ];

    return (
        <DashboardLayout title="Dashboard" user={auth?.user}>
            <Head title="Customer Dashboard" />

            <div className="mb-8">
                <H2 className="mb-1">Welcome back{auth?.user?.name ? `, ${auth.user.name.split(' ')[0]}` : ''}</H2>
                <P>Manage your vehicle search, favorites, and appointments.</P>
            </div>

            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map(({ label, value, icon: Icon, href }) => (
                    <Link key={label} href={href}>
                        <Card className="transition-all hover:shadow-md hover:ring-1 hover:ring-primary/20">
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <Icon className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{value}</p>
                                    <p className="text-sm text-muted-foreground">{label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Reservations
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/customer/reservations">View all</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {reservations.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No active reservations.</p>
                        ) : (
                            reservations.map((r) => (
                                <div key={r.id} className="flex justify-between border-b py-3 last:border-0">
                                    <span>{r.vehicle.name}</span>
                                    <span className="text-sm capitalize text-muted-foreground">{r.status}</span>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            Test Drive Bookings
                        </CardTitle>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/customer/bookings">View all</Link>
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {bookings.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No upcoming test drives.</p>
                        ) : (
                            bookings.map((b) => (
                                <div key={b.id} className="flex justify-between border-b py-3 last:border-0">
                                    <span>{b.vehicle.name}</span>
                                    <span className="text-sm text-muted-foreground">{b.scheduledAt}</span>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>

            {recentVehicles.length > 0 && (
                <div className="mt-8">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-semibold">Recently Viewed</h3>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/customer/recently-viewed">View all</Link>
                        </Button>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {recentVehicles.map((v) => v && <VehicleCard key={v.id} vehicle={toSummary(v)} />)}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
