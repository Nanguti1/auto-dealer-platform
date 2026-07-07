import { Link, router } from '@inertiajs/react';
import * as React from 'react';
import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportDocumentCard from '@/components/admin/imports/import-document-card';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportDocument, ImportRequest } from '@/components/admin/imports/types';
import { LoadingState, EmptyDocuments, InlineError } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';

export default function Index({ vehicleImport, documents = [] }: { vehicleImport?: ImportRequest; documents?: ImportDocument[] }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  if (isLoading) {
    return (
      <ImportShell title="Import Documents" description={vehicleImport ? importVehicleName(vehicleImport) : 'Preview, download, approve, and manage import documents.'} actions={<><ImportBackButton href={vehicleImport ? `/admin/imports/${vehicleImport.id}` : '/admin/imports'} /><Button asChild><Link href={`${base}/create`}>Upload Document</Link></Button></>}>
        <LoadingState message="Loading import documents..." variant="full-page" />
      </ImportShell>
    );
  }

  if (error) {
    return (
      <ImportShell title="Import Documents" description={vehicleImport ? importVehicleName(vehicleImport) : 'Preview, download, approve, and manage import documents.'} actions={<><ImportBackButton href={vehicleImport ? `/admin/imports/${vehicleImport.id}` : '/admin/imports'} /><Button asChild><Link href={`${base}/create`}>Upload Document</Link></Button></>}>
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit(base);
          }}
        />
      </ImportShell>
    );
  }

  return (
    <ImportShell title="Import Documents" description={vehicleImport ? importVehicleName(vehicleImport) : 'Preview, download, approve, and manage import documents.'} actions={<><ImportBackButton href={vehicleImport ? `/admin/imports/${vehicleImport.id}` : '/admin/imports'} /><Button asChild><Link href={`${base}/create`}>Upload Document</Link></Button></>}>
      {documents.length === 0 ? (
        <EmptyDocuments onUpload={() => router.visit(`${base}/create`)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((document) => <ImportDocumentCard key={document.id} document={document} detailsHref={`${base}/${document.id}`} onDeleteUrl={`${base}/${document.id}`} />)}
        </div>
      )}
    </ImportShell>
  );
}
