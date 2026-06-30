import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import AnalyticsShell from '@/components/admin/analytics/analytics-shell';
import { formatDate, previewValue } from '@/components/admin/settings/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Filters, Paginated } from '@/components/admin/inventory/types';

interface AnalyticsData {
  id: number;
  metric?: string;
  dimension?: string;
  value?: string | number;
  recorded_on?: string;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  [key: string]: unknown;
}

type AnalyticsPagination = Paginated<AnalyticsData>;

export default function Index({ analytics, filters = {} }: { analytics: AnalyticsPagination; filters?: Filters }) {
  const columns: Column<AnalyticsData>[] = [
    {
      key: 'metric',
      label: 'Metric',
      sortable: true,
      render: (row) => (
        <Link className="font-medium hover:underline" href={`/admin/analytics/${row.id}`}>
          {row.metric ?? 'Untitled metric'}
        </Link>
      ),
    },
    {
      key: 'dimension',
      label: 'Dimension',
      sortable: true,
      render: (row) => row.dimension ? <Badge variant="outline">{row.dimension}</Badge> : '—',
    },
    {
      key: 'value',
      label: 'Value',
      sortable: true,
      render: (row) => row.value ?? '—',
    },
    {
      key: 'recorded_on',
      label: 'Recorded Date',
      sortable: true,
      render: (row) => formatDate(row.recorded_on),
    },
    {
      key: 'metadata',
      label: 'Metadata Summary',
      render: (row) => <span className="line-clamp-2 text-sm text-muted-foreground">{previewValue(row.metadata)}</span>,
    },
    {
      key: 'created_at',
      label: 'Created Date',
      sortable: true,
      render: (row) => formatDate(row.created_at),
    },
  ];

  return (
    <AnalyticsShell title="Analytics" description="Review captured analytics metrics and recorded dimensions.">
      <AdminDataTable
        rows={analytics}
        filters={filters}
        columns={columns}
        baseUrl="/admin/analytics"
        rowActions={(row) => (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/analytics/${row.id}`}>
              <Eye className="mr-2 size-4" />
              View
            </Link>
          </Button>
        )}
      />
    </AnalyticsShell>
  );
}
