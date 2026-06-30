import { Link } from '@inertiajs/react';
import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportDocumentCard from '@/components/admin/imports/import-document-card';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportDocument, ImportRequest } from '@/components/admin/imports/types';
import { Button } from '@/components/ui/button';

export default function Index({ vehicleImport, documents = [] }: { vehicleImport?: ImportRequest; documents?: ImportDocument[] }) {
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  return (
    <ImportShell title="Import Documents" description={vehicleImport ? importVehicleName(vehicleImport) : 'Preview, download, approve, and manage import documents.'} actions={<><ImportBackButton href={vehicleImport ? `/admin/imports/${vehicleImport.id}` : '/admin/imports'} /><Button asChild><Link href={`${base}/upload`}>Upload Document</Link></Button></>}>
      {documents.length === 0 ? <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">No import documents uploaded.</div> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {documents.map((document) => <ImportDocumentCard key={document.id} document={document} detailsHref={`${base}/${document.id}`} onDeleteUrl={`${base}/${document.id}`} />)}
      </div>
    </ImportShell>
  );
}
