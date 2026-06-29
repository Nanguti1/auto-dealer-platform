import { Head, Link, usePage } from '@inertiajs/react';
import DashboardLayout from '@/layouts/dashboard/dashboard-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { H2 } from '@/components/design-system/typography';

const applications = [
    { id: 'FA-2208', vehicle: '2024 Tesla Model S Plaid', status: 'under review', updated: 'Mar 6, 2024', amount: '$89,990', history: ['Application submitted', 'Credit review', 'Lender matching'] },
    { id: 'FA-2171', vehicle: '2023 BMW X5 xDrive45e', status: 'pre-approved', updated: 'Feb 22, 2024', amount: '$65,990', history: ['Submitted', 'Approved', 'Documents requested'] },
];

export default function FinanceApplicationsPage() {
    const { auth } = usePage().props as { auth?: { user?: { name?: string; email?: string } } };

    return (
        <DashboardLayout title="Finance Applications" user={auth?.user}>
            <Head title="Finance Applications" />
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <H2>Finance Applications</H2>
                <Button asChild><Link href="/finance/calculator">Start Application</Link></Button>
            </div>
            <div className="mb-4 grid gap-3 md:grid-cols-[1fr_220px]">
                <Input placeholder="Filter applications" aria-label="Filter finance applications" />
                <select className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option>All statuses</option><option>Under review</option><option>Pre-approved</option></select>
            </div>
            <div className="overflow-hidden rounded-2xl border bg-card">
                {applications.map((application) => (
                    <div key={application.id} className="grid gap-4 border-b p-5 last:border-b-0 lg:grid-cols-[1fr_220px_auto] lg:items-center">
                        <div><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold">{application.vehicle}</h3><Badge className="capitalize">{application.status}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{application.id} • Requested {application.amount} • Updated {application.updated}</p></div>
                        <div className="space-y-1 text-xs text-muted-foreground">{application.history.map((item) => <p key={item}>• {item}</p>)}</div>
                        <Button variant="outline">Upload Documents</Button>
                    </div>
                ))}
            </div>
            <Pagination className="mt-8" currentPage={1} lastPage={1} />
        </DashboardLayout>
    );
}
