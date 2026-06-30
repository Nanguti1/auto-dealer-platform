import { Link } from '@inertiajs/react';
import { FileText, MessageSquare, Pencil } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import TimelineList from '@/components/admin/customers/timeline-list';
import { customerName, formatAddress, formatDate } from '@/components/admin/customers/helpers';
import type { CustomerDocument, CustomerNote, CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { admin } from '@/routes/admin';

interface ShowProps {
  customer: CustomerRecord;
  notes?: CustomerNote[];
  documents?: CustomerDocument[];
  timeline?: TimelineEvent[];
}

export default function Show({ customer, notes = [], documents = [], timeline = [] }: ShowProps) {
  const relationshipCards = [
    ['Purchase History', customer.purchases_count ?? 0],
    ['Reservations', customer.reservations_count ?? 0],
    ['Bookings', customer.bookings_count ?? 0],
    ['Wishlist', customer.wishlist_count ?? 0],
    ['Saved Searches', customer.saved_searches_count ?? 0],
    ['Recently Viewed Vehicles', customer.recently_viewed_count ?? 0],
    ['Finance Applications', customer.finance_applications_count ?? 0],
    ['Trade-In Requests', customer.trade_ins_count ?? 0],
    ['Import Requests', customer.import_requests_count ?? 0],
  ];

  return (
    <CustomerShell title={customerName(customer)} description={`Customer ${customer.customer_number ?? `#${customer.id}`} · Last activity ${formatDate(customer.last_activity_at ?? customer.updated_at as string)}`} actions={<><CustomerBackButton /><Button variant="outline" asChild><Link href={`/admin/customers/${customer.id}/notes`}><MessageSquare className="mr-2 size-4" />Notes</Link></Button><Button variant="outline" asChild><Link href={`/admin/customers/${customer.id}/documents`}><FileText className="mr-2 size-4" />Documents</Link></Button><Button asChild><Link href={admin.customers.edit(customer.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer Overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            <CustomerAvatar customer={customer} />
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Email</p><p>{customer.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{customer.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Account Status</p><Badge>{customer.status ?? 'Active'}</Badge></div>
              <div><p className="text-sm text-muted-foreground">Date of birth</p><p>{formatDate(customer.date_of_birth)}</p></div>
              <div className="sm:col-span-2"><p className="text-sm text-muted-foreground">Address</p><p className="whitespace-pre-line">{formatAddress(customer.address)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" asChild><Link href={`/admin/customers/${customer.id}/notes/create`}>Add note</Link></Button>
            <Button variant="outline" asChild><Link href={`/admin/customers/${customer.id}/documents/upload`}>Upload document</Link></Button>
            <Button variant="outline" asChild><Link href={`/admin/customers/${customer.id}/timeline`}>View timeline</Link></Button>
          </CardContent>
        </Card>
        {relationshipCards.map(([title, count]) => <Card key={String(title)}><CardHeader><CardTitle>{title}</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{count}</CardContent></Card>)}
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Activity Timeline</CardTitle></CardHeader><CardContent><TimelineList events={timeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{notes.length ? notes.slice(0, 4).map((note) => <p key={note.id}>{note.title ?? note.body ?? note.note}</p>) : <p className="text-muted-foreground">No notes yet.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Uploaded Documents</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{documents.length ? documents.slice(0, 4).map((document) => <p key={document.id}>{document.title ?? document.name ?? document.file_name}</p>) : <p className="text-muted-foreground">No documents uploaded.</p>}</CardContent></Card>
      </div>
    </CustomerShell>
  );
}
