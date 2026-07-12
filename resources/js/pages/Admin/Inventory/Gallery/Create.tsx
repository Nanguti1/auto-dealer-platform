import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell'; import { GalleryForm } from '@/components/admin/inventory/simple-resource-form'; import admin from '@/routes/admin'; export default function Create({ vehicles }: { vehicles: Array<{ id: number; label: string }> }) {
 return <InventoryShell title="Upload Gallery Image" actions={<BackButton href={admin.vehicleGalleries.index().url} />}><GalleryForm action={admin.vehicleGalleries.store.form().action} vehicles={vehicles} /></InventoryShell>;
}
