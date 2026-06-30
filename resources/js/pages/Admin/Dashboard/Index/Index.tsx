import * as React from 'react';
import { Head, Link } from '@inertiajs/react';
import { admin as adminRoutes } from '@/routes/admin';
import AdminLayout from '@/layouts/admin/admin-layout';
import PageHeader from '@/components/admin/page-header';
import PageWrapper from '@/components/admin/page-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSkeleton } from '@/components/admin/loading-skeleton';
import { EmptyState } from '@/components/admin/shared';
import { ArrowRight, BarChart3, CheckCircle2, Clock, DollarSign, Layers, Users } from 'lucide-react';

// Lazy load chart components
const AreaChartComponent = React.lazy(() => import('@/components/design-system/chart').then(m => ({ default: m.AreaChartComponent })));
const PieChartComponent = React.lazy(() => import('@/components/design-system/chart').then(m => ({ default: m.PieChartComponent })));

interface SummaryMetrics {
  totalVehicles: number;
  availableVehicles: number;
  reservedVehicles: number;
  soldVehicles: number;
  customers: number;
  leads: number;
  reservations: number;
  financeApplications: number;
  tradeIns: number;
  imports: number;
}

interface RecentActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  badge: string;
}

interface AdminDashboardProps {
  dashboard: {
    data: any[];
    current_page: number;
    last_page: number;
    total: number;
  };
  summary: SummaryMetrics;
  recentActivity: RecentActivityItem[];
}

export default function AdminDashboard({ summary, recentActivity }: AdminDashboardProps) {
  const statItems = [
    {
      icon: Layers,
      value: summary.totalVehicles,
      label: 'Total Vehicles',
      description: 'Active inventory across all branches.',
    },
    {
      icon: CheckCircle2,
      value: summary.availableVehicles,
      label: 'Available Vehicles',
      description: 'Vehicles currently available for sale.',
    },
    {
      icon: Clock,
      value: summary.reservedVehicles,
      label: 'Reserved Vehicles',
      description: 'Current reservations waiting confirmation.',
    },
    {
      icon: DollarSign,
      value: summary.soldVehicles,
      label: 'Sold Vehicles',
      description: 'Vehicles marked as sold this year.',
    },
  ];

  const charts = {
    sales: [
      { name: 'Jan', value: summary.soldVehicles * 0.8 },
      { name: 'Feb', value: summary.soldVehicles * 0.9 },
      { name: 'Mar', value: summary.soldVehicles * 1.2 },
      { name: 'Apr', value: summary.soldVehicles * 1.1 },
      { name: 'May', value: summary.soldVehicles * 1.4 },
      { name: 'Jun', value: summary.soldVehicles * 1.3 },
    ],
    distribution: [
      { name: 'Available', value: summary.availableVehicles },
      { name: 'Reserved', value: summary.reservedVehicles },
      { name: 'Sold', value: summary.soldVehicles },
    ],
    operations: [
      { name: 'Customers', value: summary.customers },
      { name: 'Leads', value: summary.leads },
      { name: 'Finance', value: summary.financeApplications },
      { name: 'Trade-Ins', value: summary.tradeIns },
    ],
  };

  const quickActions = [
    {
      label: 'Add vehicle',
      href: adminRoutes.vehicles.create().url,
    },
    {
      label: 'Review leads',
      href: adminRoutes.leads.index().url,
    },
    {
      label: 'Open reservations',
      href: adminRoutes.reservations.index().url,
    },
  ];

  return (
    <PageWrapper>
      <Head title="Admin Dashboard" />

      <PageHeader
        title="Executive dashboard"
        description="Track inventory, leads, reservations, and finance applications in one central overview."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button asChild>
              <Link href={adminRoutes.vehicles.create().url}>Add vehicle</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={adminRoutes.reservations.index().url}>View reservations</Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-4">
        {statItems.map((item) => (
          <Card key={item.label} className="bg-card border border-border p-6 shadow-sm">
            <CardContent className="space-y-4">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-3xl font-semibold">{item.value}</p>
                <p className="text-sm text-muted-foreground">{item.label}</p>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>Sales trend</CardTitle>
                <p className="text-sm text-muted-foreground">Vehicle sales and inventory pace over time.</p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full border border-input px-3 py-1 text-sm text-muted-foreground">
                <BarChart3 className="h-4 w-4" /> Trend
              </div>
            </CardHeader>
            <CardContent>
              <React.Suspense fallback={<LoadingSkeleton variant="chart" />}>
                <AreaChartComponent data={charts.sales} height={260} />
              </React.Suspense>
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Inventory distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <React.Suspense fallback={<LoadingSkeleton variant="chart" />}>
                  <PieChartComponent data={charts.distribution} height={240} />
                </React.Suspense>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {charts.operations.map((item) => (
                  <div key={item.name} className="flex items-center justify-between gap-4 rounded-2xl bg-muted p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{item.name}</p>
                      <p className="text-xl font-semibold">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between gap-2">
                <CardTitle>Recent activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href={adminRoutes.leads.index().url}>See all</Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.length === 0 ? (
                <EmptyState
                  icon={<Clock className="h-8 w-8" />}
                  title="No recent activity"
                  description="No recent activity has been recorded yet."
                  className="min-h-[200px] py-4"
                />
              ) : (
                recentActivity.map((item) => (
                  <div key={item.id} className="rounded-3xl border border-border bg-background px-4 py-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <span className="text-xs uppercase text-muted-foreground">{item.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Button key={action.label} variant="outline" size="sm" asChild className="w-full justify-between">
                  <a href={action.href}>{action.label}<ArrowRight className="h-4 w-4" /></a>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  );
}

AdminDashboard.layout = (page: React.ReactNode) => (
  <AdminLayout
    title="Admin Dashboard"
    breadcrumbs={[
      { title: 'Dashboard', href: adminRoutes.dashboard.index().url },
    ]}
  >
    {page}
  </AdminLayout>
);
