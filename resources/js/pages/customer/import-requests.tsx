import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { H2 } from '@/components/design-system/typography';

const imports = [
    { id: 'IM-3301', vehicle: 'Porsche 911 Carrera GTS', status: 'sourcing', updated: 'Mar 7, 2024', region: 'Germany', timeline: ['Request', 'Sourcing', 'Inspection'] },
    { id: 'IM-3280', vehicle: 'Toyota Land Cruiser', status: 'shipping', updated: 'Feb 29, 2024', region: 'Japan', timeline: ['Purchased', 'Export docs', 'Shipping'] },
];

export default function ImportRequestsPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    return (
        <DashboardLayout title="Import Requests" user={auth?.user}>
            <Head title="Import Requests" />
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <H2>Import Requests</H2>
                <Button asChild><Link href="/import/request">Request Import</Link></Button>
            </div>
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                <Input placeholder="Filter import requests" aria-label="Filter import requests" />
                <select className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option>All statuses</option><option>Sourcing</option><option>Shipping</option></select>
            </div>
            <div className="grid gap-4 xl:grid-cols-2">
                {imports.map((item) => (
                    <Card key={item.id}>
                        <CardContent className="space-y-4 p-5">
                            <div className="flex flex-wrap items-center justify-between gap-2"><h3 className="font-semibold">{item.vehicle}</h3><Badge className="capitalize">{item.status}</Badge></div>
                            <p className="text-sm text-muted-foreground">{item.id} • Source region {item.region} • Updated {item.updated}</p>
                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">{item.timeline.map((step) => <span key={step} className="rounded-full bg-muted px-3 py-1">{step}</span>)}</div>
                            <div className="flex gap-2"><Button variant="outline">View Timeline</Button><Button variant="ghost">Message Specialist</Button></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination className="mt-8" currentPage={1} lastPage={1} />
        </DashboardLayout>
    );
}
