import { Download, Eye, Trash2 } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { formatDate, formatFileSize } from '@/components/admin/customers/helpers';
import FinanceStatusBadge from './finance-status-badge';
import { userName } from './helpers';
import type { FinanceDocument } from './types';

export default function FinanceDocumentCard({ document, detailsHref, onDeleteUrl }: { document: FinanceDocument; detailsHref?: string; onDeleteUrl?: string }) {
  const title = document.title ?? document.name ?? document.file_name ?? 'Finance document';
  const uploadedBy = userName(document.uploaded_by ?? document.uploadedBy);

  return (
    <article className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{document.file_type ?? document.mime_type ?? 'file'} · {formatFileSize(document.size)}</p>
          <p className="text-xs text-muted-foreground">Uploaded {formatDate(document.created_at)} by {uploadedBy}</p>
        </div>
        <FinanceStatusBadge status={document.approval_status ?? document.status} />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {document.url ? <Button size="sm" variant="outline" asChild><a href={document.url} target="_blank" rel="noreferrer"><Eye className="mr-2 size-4" />Preview</a></Button> : null}
        {document.url ? <Button size="sm" variant="outline" asChild><a href={document.url} download><Download className="mr-2 size-4" />Download</a></Button> : null}
        {detailsHref ? <Button size="sm" variant="outline" asChild><Link href={detailsHref}>Details</Link></Button> : null}
        {onDeleteUrl ? <Button size="sm" variant="destructive" onClick={() => router.delete(onDeleteUrl)}><Trash2 className="mr-2 size-4" />Delete</Button> : null}
      </div>
    </article>
  );
}
