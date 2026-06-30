import ImportDocumentCard from '@/components/admin/imports/import-document-card';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import { formatDate, formatFileSize } from '@/components/admin/customers/helpers';
import { importVehicleName } from '@/components/admin/imports/helpers';
import type { ImportDocument, ImportRequest } from '@/components/admin/imports/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ vehicleImport, document }: { vehicleImport?: ImportRequest; document: ImportDocument }) {
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  return (
    <ImportShell title={document.title ?? document.document_type ?? document.file_name ?? 'Import Document'} description={vehicleImport ? importVehicleName(vehicleImport) : undefined} actions={<ImportBackButton href={base} />}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2"><ImportDocumentCard document={document} detailsHref={`${base}/${document.id}`} onDeleteUrl={`${base}/${document.id}`} /></div>
        <Card>
          <CardHeader><CardTitle>Document metadata</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p><span className="text-muted-foreground">File type:</span> {document.mime_type ?? '—'}</p>
            <p><span className="text-muted-foreground">Size:</span> {formatFileSize(document.file_size ?? 0)}</p>
            <p><span className="text-muted-foreground">Upload date:</span> {formatDate(document.created_at)}</p>
            <div className="flex items-center gap-2"><span className="text-muted-foreground">Approval status:</span><ImportStatusBadge status={document.approval_status} /></div>
          </CardContent>
        </Card>
      </div>
    </ImportShell>
  );
}
