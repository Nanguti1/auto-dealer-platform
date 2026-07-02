import { Link } from '@inertiajs/react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import adminRoutes from '@/routes/admin';
import AnalyticsShell from '@/components/admin/analytics/analytics-shell';
import { formatDate, previewValue } from '@/components/admin/settings/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsData {
  id: number;
  metric?: string;
  dimension?: string;
  value?: string | number;
  recorded_on?: string;
  metadata?: Record<string, unknown> | null;
  historical_information?: Array<Record<string, unknown>>;
  related_dashboard_metrics?: Array<Record<string, unknown>>;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export default function Show({ analyticsData }: { analyticsData: AnalyticsData }) {
  const historicalInformation = analyticsData.historical_information ?? [];
  const relatedDashboardMetrics = analyticsData.related_dashboard_metrics ?? [];

  return (
    <AnalyticsShell
      title={analyticsData.metric ?? 'Analytics metric'}
      description="Analytics metric details, metadata, and related dashboard context."
      actions={(
        <Button variant="outline" asChild>
          <Link href={adminRoutes.analytics.index().url}>
            <ArrowLeft className="mr-2 size-4" />
            Back to analytics
          </Link>
        </Button>
      )}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Metric details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Detail label="Metric" value={analyticsData.metric} />
            <Detail label="Dimension" value={analyticsData.dimension} />
            <Detail label="Value" value={analyticsData.value} />
            <Detail label="Recorded Date" value={formatDate(analyticsData.recorded_on)} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              Created {formatDate(analyticsData.created_at)}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="size-4" />
              Updated {formatDate(analyticsData.updated_at)}
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Metadata</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-auto rounded-xl bg-muted p-4 text-sm text-muted-foreground">{analyticsData.metadata ? JSON.stringify(analyticsData.metadata, null, 2) : 'No metadata provided.'}</pre>
          </CardContent>
        </Card>
        <OptionalList title="Historical Information" items={historicalInformation} />
        <OptionalList title="Related Dashboard Metrics" items={relatedDashboardMetrics} />
      </div>
    </AnalyticsShell>
  );
}

function Detail({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value ?? '—'}</p>
    </div>
  );
}

function OptionalList({ title, items }: { title: string; items: Array<Record<string, unknown>> }) {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length ? items.map((item, index) => (
          <div key={index} className="rounded-xl border p-4">
            <Badge variant="outline" className="mb-2">Item {index + 1}</Badge>
            <p className="text-sm text-muted-foreground">{previewValue(item, 240)}</p>
          </div>
        )) : <p className="text-sm text-muted-foreground">No {title.toLowerCase()} provided.</p>}
      </CardContent>
    </Card>
  );
}
