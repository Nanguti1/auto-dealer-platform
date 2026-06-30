import { Link } from '@inertiajs/react';
import CustomerShell from '@/components/admin/customers/customer-shell';
import DocumentCard from '@/components/admin/customers/document-card';
import type { CustomerDocument, CustomerRecord } from '@/components/admin/customers/types';
import { Button } from '@/components/ui/button';

export default function Index({ customer, documents = [] }: { customer?: CustomerRecord; documents?: CustomerDocument[] }) {
  const base = customer ? `/admin/customers/${customer.id}/documents` : '/admin/customer-documents';

  return (
    <CustomerShell title="Customer Documents" description="Preview, download, upload, and manage customer document metadata." actions={<Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button>}>
      {documents.length === 0 ? <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No documents uploaded.</div> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => <DocumentCard key={document.id} document={document} onDeleteUrl={`${base}/${document.id}`} />)}
      </div>
    </CustomerShell>
  );
}
