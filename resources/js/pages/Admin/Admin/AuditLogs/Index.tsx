import { Link, router } from '@inertiajs/react';
import { Eye, Download, Filter, Search, X } from 'lucide-react';
import * as React from 'react';
import type { Paginated } from '@/components/admin/cms/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyState } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import auditLogs from '@/routes/admin/audit-logs';

interface AuditLog {
  id: number;
  user_id?: number;
  event: string;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Index({
  logs,
  filters = {},
  users = [],
}: {
  logs: Paginated<AuditLog>;
  filters?: Record<string, any>;
  users?: User[];
}) {
  const [showFilters, setShowFilters] = React.useState(false);
  const [localFilters, setLocalFilters] = React.useState<Record<string, any>>(filters);

  const handleFilterChange = (key: string, value: string) => {
    setLocalFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    router.get(auditLogs.index.url(), localFilters, { preserveState: true });
  };

  const clearFilters = () => {
    setLocalFilters({});
    router.get(auditLogs.index.url(), {}, { preserveState: true });
  };

  const handleExport = () => {
    const url = new URL(window.location.origin + auditLogs.export.url());
    Object.entries(localFilters).forEach(([key, value]) => {
      if (value) {
url.searchParams.set(key, value);
}
    });
    window.location.href = url.toString();
  };

  const columns: Column<AuditLog>[] = [
    {
      key: 'id',
      label: 'ID',
      sortable: true,
      render: (log) => log.id,
    },
    {
      key: 'user',
      label: 'User',
      render: (log) => (
        <div>
          <span className="font-medium">{log.user?.name ?? 'System'}</span>
          {log.user?.email && <p className="text-xs text-muted-foreground">{log.user.email}</p>}
        </div>
      ),
    },
    {
      key: 'event',
      label: 'Event',
      render: (log) => (
        <Badge variant="outline" className="font-mono text-xs">
          {log.event}
        </Badge>
      ),
    },
    {
      key: 'ip_address',
      label: 'IP Address',
      render: (log) => log.ip_address ?? '—',
    },
    {
      key: 'created_at',
      label: 'Date',
      sortable: true,
      render: (log) => new Date(log.created_at).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">View and filter system activity logs.</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 size-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Audit Logs</DialogTitle>
                <DialogDescription>Apply filters to narrow down the audit logs.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by event or user..."
                    value={localFilters.search ?? ''}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user_id">User</Label>
                  <Select
                    value={localFilters.user_id ?? ''}
                    onValueChange={(value) => handleFilterChange('user_id', value)}
                  >
                    <SelectTrigger id="user_id">
                      <SelectValue placeholder="Select user" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Users</SelectItem>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event">Event</Label>
                  <Input
                    id="event"
                    placeholder="e.g., created, updated, deleted"
                    value={localFilters.event ?? ''}
                    onChange={(e) => handleFilterChange('event', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date_from">Date From</Label>
                    <Input
                      id="date_from"
                      type="date"
                      value={localFilters.date_from ?? ''}
                      onChange={(e) => handleFilterChange('date_from', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_to">Date To</Label>
                    <Input
                      id="date_to"
                      type="date"
                      value={localFilters.date_to ?? ''}
                      onChange={(e) => handleFilterChange('date_to', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={clearFilters}>
                    <X className="mr-2 size-4" />
                    Clear
                  </Button>
                  <Button onClick={applyFilters}>
                    <Search className="mr-2 size-4" />
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 size-4" />
            Export
          </Button>
        </div>
      </div>

      {logs.data.length === 0 ? (
        <EmptyState
          title="No audit logs found"
          description="There are no audit logs matching your criteria."
          icon={<Eye className="size-12 text-muted-foreground" />}
        />
      ) : (
        <AdminDataTable
          rows={logs}
          filters={filters}
          columns={columns}
          baseUrl={auditLogs.index.url()}
          rowActions={(log) => (
            <Button variant="ghost" size="icon" asChild>
              <Link href={auditLogs.show.url(log.id)}>
                <Eye className="size-4" />
              </Link>
            </Button>
          )}
        />
      )}
    </div>
  );
}
