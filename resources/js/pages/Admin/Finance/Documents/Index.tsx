import { Link } from '@inertiajs/react';
import FinanceDocumentCard from '@/components/admin/finance/finance-document-card';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, FinanceDocument } from '@/components/admin/finance/types';
import { Button } from '@/components/ui/button';

export default function Index({ financeApplication, documents = [] }: { financeApplication?: FinanceApplication; documents?: FinanceDocument[] }) {
  const base = financeApplication ? `/admin/finance-applications/${financeApplication.id}/documents` : '/admin/finance-documents';

  return (
    <FinanceShell title="Finance Documents" description={financeApplication ? applicantName(financeApplication) : 'Preview, download, approve, and manage finance documents.'} actions={<><FinanceBackButton href={financeApplication ? `/admin/finance-applications/${financeApplication.id}` : '/admin/finance-applications'} /><Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button></>}>
      {documents.length === 0 ? <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No finance documents uploaded.</div> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => <FinanceDocumentCard key={document.id} document={document} detailsHref={`${base}/${document.id}`} onDeleteUrl={`${base}/${document.id}`} />)}
      </div>
    </FinanceShell>
  );
}
