import { Link, router } from '@inertiajs/react';
import * as React from 'react';
import FinanceDocumentCard from '@/components/admin/finance/finance-document-card';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, FinanceDocument } from '@/components/admin/finance/types';
import { LoadingState, EmptyDocuments, InlineError } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ financeApplication, documents = [] }: { financeApplication?: FinanceApplication; documents?: FinanceDocument[] }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const base = financeApplication ? `/admin/finance-applications/${financeApplication.id}/documents` : '/admin/finance-documents';

  if (isLoading) {
    return (
      <FinanceShell title="Finance Documents" description={financeApplication ? applicantName(financeApplication) : 'Preview, download, approve, and manage finance documents.'} actions={<><FinanceBackButton href={financeApplication ? `/admin/finance-applications/${financeApplication.id}` : '/admin/finance-applications'} /><Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button></>}>
        <LoadingState message="Loading finance documents..." variant="full-page" />
      </FinanceShell>
    );
  }

  if (error) {
    return (
      <FinanceShell title="Finance Documents" description={financeApplication ? applicantName(financeApplication) : 'Preview, download, approve, and manage finance documents.'} actions={<><FinanceBackButton href={financeApplication ? `/admin/finance-applications/${financeApplication.id}` : '/admin/finance-applications'} /><Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button></>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(base);
          }}
        />
      </FinanceShell>
    );
  }

  return (
    <FinanceShell title="Finance Documents" description={financeApplication ? applicantName(financeApplication) : 'Preview, download, approve, and manage finance documents.'} actions={<><FinanceBackButton href={financeApplication ? `/admin/finance-applications/${financeApplication.id}` : '/admin/finance-applications'} /><Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button></>}>
      {documents.length === 0 ? (
        <EmptyDocuments onUpload={() => router.visit(`${base}/upload`)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => <FinanceDocumentCard key={document.id} document={document} detailsHref={`${base}/${document.id}`} onDeleteUrl={`${base}/${document.id}`} />)}
        </div>
      )}
    </FinanceShell>
  );
}
