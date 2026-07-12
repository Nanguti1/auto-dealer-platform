import { Link, router } from '@inertiajs/react';
import { ChevronDown, Columns3, Download, Search, Upload } from 'lucide-react';
import * as React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/design-system/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Pagination } from '@/components/ui/pagination';
import { compact } from './helpers';
import type { Filters, Paginated } from './types';

export interface Column<T> {
  key: string;
  label: string;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
  hidden?: boolean;
  className?: string;
}

interface Props<T extends { id: number }> {
  rows: Paginated<T>;
  filters?: Filters;
  columns: Column<T>[];
  baseUrl: string;
  createUrl?: string;
  createLabel?: string;
  rowActions?: (row: T) => React.ReactNode;
  bulkActions?: React.ReactNode;
  filterSlot?: React.ReactNode;
}

const AdminDataTable = React.memo(function AdminDataTable<T extends { id: number }>({
  rows,
  filters = {},
  columns,
  baseUrl,
  createUrl,
  createLabel = 'Create',
  rowActions,
  bulkActions,
  filterSlot,
}: Props<T>) {
  const [selected, setSelected] = React.useState<number[]>([]);
  const [query, setQuery] = React.useState(String(filters.search ?? ''));
  const [visible, setVisible] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(columns.map((c) => [c.key, !c.hidden]))
  );

  const apply = React.useCallback((next: Filters) =>
    router.get(baseUrl, compact({ ...filters, ...next, page: undefined }), {
      preserveState: true,
      preserveScroll: true,
    }), [baseUrl, filters]);

  const toggleAll = React.useCallback((checked: boolean) =>
    setSelected(checked ? rows.data.map((row) => row.id) : []), [rows.data]);

  const visibleColumns = React.useMemo(() =>
    columns.filter((column) => visible[column.key]), [columns, visible]);

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 lg:flex-row lg:items-center lg:justify-between">
        <form className="flex flex-1 gap-2" onSubmit={(event) => {
 event.preventDefault(); apply({ search: query }); 
}}>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="pl-9"
              placeholder="Search inventory..."
              aria-label="Search inventory"
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <div className="flex flex-wrap gap-2">
          {filterSlot}
          <Button variant="outline" aria-label="Import data">
            <Upload className="mr-2 size-4" aria-hidden="true" />
            Import
          </Button>
          <Button variant="outline" aria-label="Export data">
            <Download className="mr-2 size-4" aria-hidden="true" />
            Export
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" aria-label="Show column options">
                <Columns3 className="mr-2 size-4" aria-hidden="true" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {columns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.key}
                  checked={visible[column.key]}
                  onCheckedChange={(checked) =>
                    setVisible((current) => ({ ...current, [column.key]: Boolean(checked) }))
                  }
                >
                  {column.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {createUrl ? (
            <Button asChild>
              <Link href={createUrl}>{createLabel}</Link>
            </Button>
          ) : null}
        </div>
      </div>

      {/* Bulk Actions */}
      {selected.length > 0 ? (
        <div className="flex items-center justify-between rounded-xl border bg-muted/40 p-3" role="region" aria-live="polite">
          <Badge variant="secondary">{selected.length} selected</Badge>
          <div className="flex gap-2">
            {bulkActions ?? (
              <>
                <Button size="sm" variant="outline">Publish</Button>
                <Button size="sm" variant="outline">Archive</Button>
                <Button size="sm" variant="destructive">Delete</Button>
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* Data Table */}
      <div className="overflow-hidden rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox
                  checked={selected.length === rows.data.length && rows.data.length > 0}
                  onCheckedChange={toggleAll}
                  aria-label="Select all rows"
                />
              </TableHead>
              {visibleColumns.map((column) => (
                <TableHead key={column.key} className={column.className}>
                  {column.sortable ? (
                    <button
                      type="button"
                      onClick={() => apply({ sort: column.key, order: filters.order === 'asc' ? 'desc' : 'asc' })}
                      className="flex items-center gap-2 font-medium hover:text-accent-foreground"
                      aria-label={`Sort by ${column.label}`}
                    >
                      {column.label}
                      {filters.sort === column.key && (
                        <ChevronDown className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.label
                  )}
                </TableHead>
              ))}
              {rowActions && <TableHead className="w-10" aria-label="Actions">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox
                    checked={selected.includes(row.id)}
                    onCheckedChange={(checked) =>
                      setSelected((current) =>
                        checked
                          ? [...current, row.id]
                          : current.filter((id) => id !== row.id)
                      )
                    }
                    aria-label={`Select row ${row.id}`}
                  />
                </TableCell>
                {visibleColumns.map((column) => (
                  <TableCell key={column.key} className={column.className}>
                    {column.render(row)}
                  </TableCell>
                ))}
                {rowActions && (
                  <TableCell>
                    <div className="flex justify-end gap-1" role="group" aria-label={`Row actions for ${row.id}`}>
                      {rowActions(row)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {rows.links && rows.links.length > 0 ? (
        <Pagination links={rows.links} />
      ) : null}
    </div>
  );
}) as <T extends { id: number }>(props: Props<T>) => React.JSX.Element;

export default AdminDataTable;
