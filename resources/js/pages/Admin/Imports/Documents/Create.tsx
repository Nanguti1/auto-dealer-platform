import { Link } from '@inertiajs/react';
import { importVehicleName } from '@/components/admin/imports/helpers';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import type { ImportRequest } from '@/components/admin/imports/types';
import { Button } from '@/components/ui/button';

export default function Create({ vehicleImport }: { vehicleImport?: ImportRequest }) {
  const base = vehicleImport ? `/admin/imports/${vehicleImport.id}/documents` : '/admin/import-documents';

  return (
    <ImportShell title="Upload Import Document" description={vehicleImport ? importVehicleName(vehicleImport) : 'Attach documents for import requests.'} actions={<ImportBackButton href={base} />}>
      <div className="rounded-xl border bg-card p-8 text-center">
        <p className="text-muted-foreground mb-4">Please use the Upload page to add new import documents.</p>
        <Button asChild>
          <Link href={`${base}/upload`}>Go to Upload Page</Link>
        </Button>
      </div>
    </ImportShell>
  );
}
