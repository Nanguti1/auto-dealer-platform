import { Link } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import { imageUrl, vehicleName } from '@/components/admin/inventory/helpers';
import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import type { AdminGallery } from '@/components/admin/inventory/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Show({ vehicleGallery }: { vehicleGallery: AdminGallery }) {
  return <InventoryShell title="Gallery Image" actions={<><BackButton href={adminRoutes.vehicleGalleries.index().url} /><Button asChild><Link href={adminRoutes.vehicleGalleries.edit(vehicleGallery.id).url}>Edit</Link></Button></>}><Card><CardContent className="grid gap-6 p-6 lg:grid-cols-2"><img src={imageUrl(vehicleGallery.path)} alt={vehicleGallery.alt_text ?? ''} className="w-full rounded-xl object-cover" /><dl className="space-y-3"><div><dt className="text-muted-foreground">Vehicle</dt><dd>{vehicleName(vehicleGallery.vehicle)}</dd></div><div><dt className="text-muted-foreground">Alt text</dt><dd>{vehicleGallery.alt_text ?? '—'}</dd></div><div><dt className="text-muted-foreground">Sort order</dt><dd>{vehicleGallery.sort_order ?? 0}</dd></div></dl></CardContent></Card></InventoryShell>;
}
