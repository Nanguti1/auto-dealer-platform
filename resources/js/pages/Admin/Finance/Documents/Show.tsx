import FinanceDocumentCard from '@/components/admin/finance/finance-document-card';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import FinanceStatusBadge from '@/components/admin/finance/finance-status-badge';
import { applicantName, userName } from '@/components/admin/finance/helpers';
import { formatDate, formatFileSize } from '@/components/admin/customers/helpers';
import type { FinanceApplication, FinanceDocument } from '@/components/admin/finance/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ financeApplication, document }: { financeApplication?: FinanceApplication; document: FinanceDocument }) {
  const base = financeApplication ? `/admin/finance-applications/${financeApplication.id}/documents` : '/admin/finance-documents';

  return (
    <FinanceShell title={document.title ?? document.name ?? document.file_name ?? 'Finance Document'} description={financeApplication ? applicantName(financeApplication) : undefined} actions={<FinanceBackButton href={base} />}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><FinanceDocumentCard document={document} onDeleteUrl={`${base}/${document.id}`} /></div>
        <Card>
          <CardHeader><CardTitle>Document metadata</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">File type:</span> {document.file_type ?? document.mime_type ?? '—'}</p>
            <p><span className="text-muted-foreground">Size:</span> {formatFileSize(document.size)}</p>
            <p><span className="text-muted-foreground">Uploaded by:</span> {userName(document.uploaded_by ?? document.uploadedBy)}</p>
            <p><span className="text-muted-foreground">Upload date:</span> {formatDate(document.created_at)}</p>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Approval status:</span><FinanceStatusBadge status={document.approval_status ?? document.status} /></div>
          </CardContent>
        </Card>
      </div>
    </FinanceShell>
  );
}
