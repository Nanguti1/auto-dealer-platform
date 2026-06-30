import { Link, router } from '@inertiajs/react';
import { Download, Eye, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate, formatFileSize } from './helpers';
import type { CustomerDocument } from './types';

export default function DocumentCard({ document, onDeleteUrl }: { document: CustomerDocument; onDeleteUrl?: string }) {
  const title = document.title ?? document.name ?? document.file_name ?? 'Customer document';

  return (
    <article className="rounded-xl border bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">{formatFileSize(document.size)} · Uploaded {formatDate(document.created_at)}</p>
        </div>
        <Badge variant="secondary">{document.file_type ?? document.mime_type ?? 'file'}</Badge>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {document.url ? <Button size="sm" variant="outline" asChild><a href={document.url} target="_blank" rel="noreferrer"><Eye className="mr-2 size-4" />Preview</a></Button> : null}
        {document.url ? <Button size="sm" variant="outline" asChild><a href={document.url} download><Download className="mr-2 size-4" />Download</a></Button> : null}
        <Button size="sm" variant="outline" asChild><Link href={`/admin/customers/documents/${document.id}`}>Details</Link></Button>
        {onDeleteUrl ? <Button size="sm" variant="destructive" onClick={() => router.delete(onDeleteUrl)}><Trash2 className="mr-2 size-4" />Delete</Button> : null}
      </div>
    </article>
  );
}
