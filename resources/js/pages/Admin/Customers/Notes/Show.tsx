import { Link, router } from '@inertiajs/react';
import { Pencil, Trash2 } from 'lucide-react';
import * as React from 'react';
import ConfirmationDialog from '@/components/admin/confirmation-dialog';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import { formatDate } from '@/components/admin/customers/helpers';
import type { CustomerNote, CustomerRecord } from '@/components/admin/customers/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ customer, note }: { customer?: CustomerRecord; note: CustomerNote }) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const base = customer ? `/admin/customers/${customer.id}/notes` : '/admin/customer-notes';

  return (
    <CustomerShell title={note.title ?? 'Customer Note'} description={`Created ${formatDate(note.created_at)}${note.author?.name ? ` by ${note.author.name}` : ''}`} actions={<><CustomerBackButton href={base} /><Button variant="outline" asChild><Link href={`${base}/${note.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button><Button variant="outline" onClick={() => setDeleteId(note.id)}><Trash2 className="mr-2 size-4" />Delete</Button></>}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{note.title ?? 'Customer note'}</CardTitle>
            {note.is_pinned ? <Badge>Pinned</Badge> : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-line text-sm">{note.body ?? note.note}</div>
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Created: {formatDate(note.created_at)}</p>
            {note.updated_at && note.updated_at !== note.created_at ? <p>Updated: {formatDate(note.updated_at)}</p> : null}
            {note.author?.name ? <p>Author: {note.author.name}</p> : null}
          </div>
        </CardContent>
      </Card>
      <ConfirmationDialog open={deleteId === note.id} onOpenChange={(open) => !open && setDeleteId(null)} title="Delete note?" description="This removes the customer note and timeline reference." trigger={<span />} confirmLabel="Delete" onConfirm={() => router.delete(`${base}/${note.id}`, { onFinish: () => setDeleteId(null) })} />
    </CustomerShell>
  );
}
