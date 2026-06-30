import { Link, router } from '@inertiajs/react';
import { Pencil, Star } from 'lucide-react';
import { formatCurrency, formatNumber, vehicleName } from '@/components/admin/inventory/helpers';
import InventoryShell, { BackButton } from '@/components/admin/inventory/inventory-shell';
import type { AdminVehicle } from '@/components/admin/inventory/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { admin } from '@/routes/admin';
export default function Show({ vehicle }: { vehicle: AdminVehicle }) {
 const panels = ['Gallery','Specifications','Features','History','Price history','Status timeline','Related reservations','Related finance applications','Related trade-ins'];

 return <InventoryShell title={vehicleName(vehicle)} description={`Stock ${vehicle.stock_number ?? '—'} · VIN ${vehicle.vin ?? '—'}`} actions={<><BackButton /><Button variant="outline" onClick={() => router.patch((vehicle.is_featured ? admin.vehicles.unfeature(vehicle.id) : admin.vehicles.feature(vehicle.id)).url)}><Star className="mr-2 size-4" />{vehicle.is_featured ? 'Unfeature' : 'Feature'}</Button><Button asChild><Link href={admin.vehicles.edit(vehicle.id).url}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}><div className="grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle>Vehicle overview</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2"><p><span className="text-muted-foreground">Year</span><br />{vehicle.year ?? '—'}</p><p><span className="text-muted-foreground">Price</span><br />{formatCurrency(vehicle.sale_price)}</p><p><span className="text-muted-foreground">Mileage</span><br />{formatNumber(vehicle.mileage)} mi</p><p><span className="text-muted-foreground">Status</span><br /><Badge>{vehicle.is_featured ? 'Featured' : 'Available'}</Badge></p><p className="sm:col-span-2">{vehicle.description ?? 'No description provided.'}</p></CardContent></Card>{panels.map((panel) => <Card key={panel}><CardHeader><CardTitle>{panel}</CardTitle></CardHeader><CardContent className="text-sm text-muted-foreground">Connected backend data will appear here when included in Inertia props.</CardContent></Card>)}</div></InventoryShell>; 
}
