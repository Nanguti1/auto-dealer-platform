import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import NoteForm from '@/components/admin/customers/note-form';
import type { CustomerRecord } from '@/components/admin/customers/types';

export default function Create({ customer }: { customer?: CustomerRecord }) {
  const base = customer ? `/admin/customers/${customer.id}/notes` : '/admin/customer-notes';

  return <CustomerShell title="Create Customer Note" actions={<CustomerBackButton href={base} />}><NoteForm action={base} customerId={customer?.id} /></CustomerShell>;
}
