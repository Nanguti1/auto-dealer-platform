import CustomerShell, { CustomerBackButton } from '@/components/admin/customers/customer-shell';
import DocumentCard from '@/components/admin/customers/document-card';
import { formatDate, formatFileSize } from '@/components/admin/customers/helpers';
import type { CustomerDocument, CustomerRecord } from '@/components/admin/customers/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ customer, document }: { customer?: CustomerRecord; document: CustomerDocument }) {
  const base = customer ? `/admin/customers/${customer.id}/documents` : '/admin/customer-documents';

  return (
    <CustomerShell title={document.title ?? document.name ?? document.file_name ?? 'Customer Document'} actions={<CustomerBackButton href={base} />}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><DocumentCard document={document} onDeleteUrl={`${base}/${document.id}`} /></div>
        <Card>
          <CardHeader><CardTitle>Document metadata</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">File type:</span> {document.file_type ?? document.mime_type ?? '—'}</p>
            <p><span className="text-muted-foreground">Size:</span> {formatFileSize(document.size)}</p>
            <p><span className="text-muted-foreground">Uploaded:</span> {formatDate(document.created_at)}</p>
            <p><span className="text-muted-foreground">Status:</span> {document.status ?? 'Active'}</p>
          </CardContent>
        </Card>
      </div>
    </CustomerShell>
  );
}
