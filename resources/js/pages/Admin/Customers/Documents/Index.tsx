import { Link, router } from '@inertiajs/react';
import * as React from 'react';
import CustomerShell from '@/components/admin/customers/customer-shell';
import DocumentCard from '@/components/admin/customers/document-card';
import type { CustomerDocument, CustomerRecord } from '@/components/admin/customers/types';
import { LoadingState, EmptyDocuments, InlineError } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ customer, documents = [] }: { customer?: CustomerRecord; documents?: CustomerDocument[] }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const base = customer ? `/admin/customers/${customer.id}/documents` : '/admin/customer-documents';

  if (isLoading) {
    return (
      <CustomerShell title="Customer Documents" description="Preview, download, upload, and manage customer document metadata." actions={<Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button>}>
        <LoadingState message="Loading documents..." variant="full-page" />
      </CustomerShell>
    );
  }

  if (error) {
    return (
      <CustomerShell title="Customer Documents" description="Preview, download, upload, and manage customer document metadata." actions={<Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(base);
          }}
        />
      </CustomerShell>
    );
  }

  return (
    <CustomerShell title="Customer Documents" description="Preview, download, upload, and manage customer document metadata." actions={<Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button>}>
      {documents.length === 0 ? (
        <EmptyDocuments onUpload={() => router.visit(`${base}/upload`)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => <DocumentCard key={document.id} document={document} onDeleteUrl={`${base}/${document.id}`} />)}
        </div>
      )}
    </CustomerShell>
  );
}
