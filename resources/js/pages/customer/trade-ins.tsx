import { Head, Link, usePage } from '@inertiajs/react';
import { H2 } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { useCurrency } from '@/hooks/use-currency';

export default function TradeInsPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };
    const { formatPrice } = useCurrency();

    const requests = [
        { id: 'TR-1042', vehicle: '2021 BMW 330i', status: 'inspection scheduled', updated: 'Mar 4, 2024', estimateUSD: 28500, timeline: ['Submitted', 'Valuation', 'Inspection'] },
        { id: 'TR-1018', vehicle: '2019 Audi Q5', status: 'offer sent', updated: 'Feb 18, 2024', estimateUSD: 24200, timeline: ['Submitted', 'Valuation', 'Offer'] },
    ];

    return (
        <DashboardLayout title="Trade-In Requests" user={auth?.user}>
            <Head title="Trade-In Requests" />
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <H2>Trade-In Requests</H2>
                <Button asChild><Link href="/trade-in/request">Start Trade-In</Link></Button>
            </div>
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                <Input placeholder="Filter by vehicle or request ID" aria-label="Filter trade-in requests" />
                <select className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option>All statuses</option><option>Offer sent</option><option>Inspection scheduled</option></select>
            </div>
            <div className="space-y-4">
                {requests.map((request) => (
                    <Card key={request.id}>
                        <CardContent className="grid gap-5 p-5 lg:grid-cols-[1fr_260px_auto] lg:items-center">
                            <div>
                                <div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{request.vehicle}</h3><Badge className="capitalize">{request.status}</Badge></div>
                                <p className="mt-1 text-sm text-muted-foreground">{request.id} • Updated {request.updated} • Estimated value {formatPrice(request.estimateUSD)}</p>
                            </div>
                            <ol className="flex gap-2 text-xs text-muted-foreground">
                                {request.timeline.map((step) => <li key={step} className="rounded-full bg-muted px-3 py-1">{step}</li>)}
                            </ol>
                            <Button variant="outline">View History</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Pagination className="mt-8" currentPage={1} lastPage={1} />
        </DashboardLayout>
    );
}
