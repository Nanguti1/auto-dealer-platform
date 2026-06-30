import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell'; import { GalleryForm } from '@/components/admin/inventory/simple-resource-form'; import type { AdminGallery } from '@/components/admin/inventory/types'; export default function Edit({ vehicleGallery }: { vehicleGallery: AdminGallery }) {
 return <InventoryShell title="Edit Gallery Image" actions={<BackButton href={`/admin/vehicle-galleries/${vehicleGallery.id}`} />}><GalleryForm gallery={vehicleGallery} action={`/admin/vehicle-galleries/${vehicleGallery.id}`} /></InventoryShell>; 
}
