import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import NoteForm from '@/components/admin/customers/note-form';
import type { CustomerNote, CustomerRecord } from '@/components/admin/customers/types';

export default function Edit({ customer, note }: { customer?: CustomerRecord; note: CustomerNote }) {
  const base = customer ? `/admin/customers/${customer.id}/notes` : '/admin/customer-notes';

  return <CustomerShell title="Edit Customer Note" actions={<CustomerBackButton href={base} />}><NoteForm note={note} action={`${base}/${note.id}`} customerId={customer?.id} /></CustomerShell>;
}
