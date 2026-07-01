import { Link, router } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import * as React from 'react';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { formatDate, previewValue } from '@/components/admin/settings/helpers';
import SettingShell from '@/components/admin/settings/setting-shell';
import SettingStatusBadge from '@/components/admin/settings/setting-status-badge';
import type { AdminSetting, AdminSettingsPagination, SettingsFilters } from '@/components/admin/settings/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Index({ settings, filters = {} }: { settings: AdminSettingsPagination; filters?: SettingsFilters }) {
  const [group, setGroup] = React.useState(String(filters.group ?? ''));
  const [type, setType] = React.useState(String(filters.type ?? 'all'));

  const applyFilters = () => {
    router.get('/admin/settings', { ...filters, group: group || undefined, type: type === 'all' ? undefined : type, page: undefined }, { preserveState: true, preserveScroll: true });
  };

  const clearFilters = () => {
    setGroup('');
    setType('all');
    router.get('/admin/settings', { search: filters.search }, { preserveState: true, preserveScroll: true });
  };

  const columns: Column<AdminSetting>[] = [
    {
      key: 'group',
      label: 'Group',
      sortable: true,
      render: (setting) => setting.group ?? '—',
    },
    {
      key: 'key',
      label: 'Key',
      sortable: true,
      render: (setting) => <span className="font-medium">{setting.key ?? '—'}</span>,
    },
    {
      key: 'value',
      label: 'Value Preview',
      render: (setting) => <span className="line-clamp-2 text-sm text-muted-foreground">{previewValue(setting.value)}</span>,
    },
    {
      key: 'type',
      label: 'Type',
      sortable: true,
      render: (setting) => setting.type ?? '—',
    },
    {
      key: 'is_public',
      label: 'Visibility',
      render: (setting) => <SettingStatusBadge isPublic={setting.is_public} />,
    },
    {
      key: 'updated_at',
      label: 'Updated Date',
      sortable: true,
      render: (setting) => formatDate(setting.updated_at),
    },
  ];

  return (
    <SettingShell
      title="Admin Settings"
      description="Manage grouped configuration values exposed by the existing settings backend."
      actions={<Button asChild><Link href="/admin/settings/create">Create Setting</Link></Button>}
    >
      <AdminDataTable
        rows={settings}
        filters={filters}
        columns={columns}
        baseUrl="/admin/settings"
        createUrl="/admin/settings/create"
        createLabel="Create Setting"
        filterSlot={(
          <div className="flex flex-wrap items-end gap-2">
            <div className="grid gap-1">
              <Label htmlFor="group-filter" className="text-xs">Group</Label>
              <Input id="group-filter" value={group} onChange={(event) => setGroup(event.target.value)} placeholder="Filter group" className="h-9 w-36" />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="type-filter" className="text-xs">Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type-filter" className="h-9 w-36">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="string">String</SelectItem>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={applyFilters}>Apply</Button>
            <Button type="button" variant="ghost" size="sm" onClick={clearFilters}>Clear</Button>
          </div>
        )}
        rowActions={(setting) => (
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/settings/${setting.id}/edit`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        )}
      />
    </SettingShell>
  );
}
