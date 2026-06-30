import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import InventoryShell from '@/components/admin/inventory/inventory-shell';
import type { AdminFeature, Filters, Paginated } from '@/components/admin/inventory/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { admin } from '@/routes/admin';
export default function Index({ vehicleFeatures, filters = {} }: { vehicleFeatures: Paginated<AdminFeature>; filters?: Filters }) {
 const [deleteId, setDeleteId] = React.useState<number | null>(null); const columns: Column<AdminFeature>[] = [{ key: 'name', label: 'Feature', sortable: true, render: (f) => <div className="font-medium">{f.name ?? f.title ?? 'Untitled'}</div> }, { key: 'category', label: 'Category', sortable: true, render: (f) => f.category ?? 'General' }, { key: 'slug', label: 'Slug', render: (f) => f.slug ?? '—' }, { key: 'status', label: 'Status', render: (f) => <Badge variant={f.is_active === false ? 'secondary' : 'default'}>{f.is_active === false ? 'Inactive' : 'Active'}</Badge> }, { key: 'assignments', label: 'Assignments', render: (f) => String(f.assignments_count ?? f.vehicles_count ?? 0) }];

 return <InventoryShell title="Vehicle Features" description="Maintain feature taxonomy, statuses, and inventory assignments." actions={<Button asChild><Link href={admin.vehicleFeatures.create().url}>Create Feature</Link></Button>}><AdminDataTable rows={vehicleFeatures} filters={filters} columns={columns} baseUrl={admin.vehicleFeatures.index().url} createUrl={admin.vehicleFeatures.create().url} createLabel="Create Feature" rowActions={(f) => <div className="flex justify-end gap-1"><Button variant="ghost" size="icon" asChild><Link href={admin.vehicleFeatures.show(f.id).url}><Eye className="size-4" /></Link></Button><Button variant="ghost" size="icon" asChild><Link href={admin.vehicleFeatures.edit(f.id).url}><Pencil className="size-4" /></Link></Button><Button variant="ghost" size="icon" onClick={() => setDeleteId(f.id)}><Trash2 className="size-4" /></Button><ConfirmationDialog open={deleteId === f.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete feature?" description="This removes the feature from the catalog." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(admin.vehicleFeatures.destroy(f.id).url, { onFinish: () => setDeleteId(null) })} /></div>} /></InventoryShell>; 
}
