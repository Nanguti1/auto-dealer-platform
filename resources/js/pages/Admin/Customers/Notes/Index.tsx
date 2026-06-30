import * as React from 'react';
import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CustomerShell from '@/components/admin/customers/customer-shell';
import { formatDate } from '@/components/admin/customers/helpers';
import type { CustomerNote, CustomerRecord } from '@/components/admin/customers/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ customer, notes = [] }: { customer?: CustomerRecord; notes?: CustomerNote[] }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const base = customer ? `/admin/customers/${customer.id}/notes` : '/admin/customer-notes';

  return (
    <CustomerShell title="Customer Notes" description="Manage customer notes and timeline context." actions={<Button asChild><Link href={`${base}/create`}>Create Note</Link></Button>}>
      <div className="space-y-4">
        {notes.length === 0 ? <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No notes found.</div> : null}
        {notes.map((note) => (
          <article key={note.id} className="rounded-xl border bg-card p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2"><h2 className="font-medium">{note.title ?? 'Customer note'}</h2>{note.is_pinned ? <Badge>Pinned</Badge> : null}</div>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{note.body ?? note.note}</p>
                <p className="mt-3 text-xs text-muted-foreground">{formatDate(note.created_at)}{note.author?.name ? ` · ${note.author.name}` : ''}</p>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" asChild><Link href={`${base}/${note.id}/edit`}><Pencil className="size-4" /></Link></Button>
                <Button variant="ghost" size="icon" onClick={() => setDeleteId(note.id)}><Trash2 className="size-4" /></Button>
                <ConfirmationDialog open={deleteId === note.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete note?" description="This removes the customer note and timeline reference." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`${base}/${note.id}`, { onFinish: () => setDeleteId(null) })} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </CustomerShell>
  );
}
