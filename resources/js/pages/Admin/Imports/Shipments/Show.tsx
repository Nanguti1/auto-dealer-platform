import { Link } from '@inertiajs/react';
import { Eye, MapPin, Ship } from 'lucide-react';
import adminRoutes from '@/routes/admin';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { formatDateTime, importVehicleName, requesterName } from '@/components/admin/imports/helpers';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import type { ImportRequest, Shipment } from '@/components/admin/imports/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ shipment }: { shipment: Shipment }) {
  const vehicleImport = shipment.vehicle_import;
  const trackingEvents = shipment?.tracking_events ?? vehicleImport?.timeline ?? [];
  const portHistory = vehicleImport?.request_data?.port_history ?? [];

  if (!vehicleImport) {
    return (
      <ImportShell title="Shipment Details" description="Shipment information" actions={<ImportBackButton href={adminRoutes.shipments.index().url} />}>
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No import request associated with this shipment.</p>
          </CardContent>
        </Card>
      </ImportShell>
    );
  }

  return (
    <ImportShell title={`Shipment ${shipment?.shipment_reference ?? vehicleImport?.reference_number ?? 'Unknown'}`} description={`Tracking import #${vehicleImport?.id ?? 'Unknown'} · Updated ${formatDateTime(vehicleImport?.updated_at)}`} actions={<><ImportBackButton href={adminRoutes.shipments.index().url} /><Button variant="outline" asChild><Link href={adminRoutes.imports.show(vehicleImport?.id ?? 0).url}><Eye className="mr-2 size-4" />View Request</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Shipment overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {vehicleImport?.customer ? <CustomerAvatar customer={vehicleImport.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{requesterName(vehicleImport)}</p></div>
              <div><p className="text-sm text-muted-foreground">Shipment reference</p><p>{shipment?.shipment_reference ?? vehicleImport?.reference_number ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Container number</p><p>{shipment?.container_number ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Current status</p><ImportStatusBadge status={shipment?.status ?? vehicleImport?.status} /></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Current location</CardTitle></CardHeader><CardContent className="space-y-2"><div className="flex items-center gap-2"><MapPin className="size-4 text-muted-foreground" /><p className="font-medium">{shipment?.current_location ?? 'Unknown'}</p></div><p className="text-sm text-muted-foreground">Updated: {formatDateTime(shipment?.updated_at ?? vehicleImport?.updated_at)}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Shipping details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Shipping line</p><p>{shipment?.shipping_line ?? '—'}</p><p className="text-sm text-muted-foreground">Vessel</p><p>{shipment?.vessel ?? '—'}</p><p className="text-sm text-muted-foreground">Shipping method</p><p>{vehicleImport?.shipping_method ?? vehicleImport?.request_data?.shipping_method ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Port information</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Port of loading</p><p>{shipment?.port_of_loading ?? vehicleImport?.port_of_loading ?? '—'}</p><p className="text-sm text-muted-foreground">Destination port</p><p>{shipment?.destination_port ?? vehicleImport?.destination_port ?? '—'}</p><p className="text-sm text-muted-foreground">Origin country</p><p>{vehicleImport?.origin_country ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Delivery timeline</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Estimated arrival</p><p>{formatDateTime(vehicleImport?.estimated_arrival ?? shipment?.estimated_arrival)}</p><p className="text-sm text-muted-foreground">Shipment status</p><ImportStatusBadge status={shipment?.status} /></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Shipment timeline</CardTitle></CardHeader><CardContent><TimelineList events={trackingEvents} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Customs status</CardTitle></CardHeader><CardContent className="space-y-2"><ImportStatusBadge status={shipment?.customs_status} /><p className="text-sm text-muted-foreground">Clearance progress tracked in timeline</p></CardContent></Card>
        <Card className="lg:col-span-3"><CardHeader><CardTitle>Port history</CardTitle></CardHeader><CardContent className="space-y-3">{portHistory.length ? portHistory.map((port: any, index: number) => <div key={index} className="rounded-lg border p-3"><div className="flex items-center justify-between"><p className="font-medium">{port.port_name ?? port.name ?? 'Unknown port'}</p><span className="text-sm text-muted-foreground">{formatDateTime(port.arrival_date ?? port.date)}</span></div><p className="text-sm text-muted-foreground">{port.status ?? 'Transit'}</p></div>) : <p className="text-sm text-muted-foreground">No port history recorded.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Related vehicle</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{importVehicleName(vehicleImport)}</p><p className="text-sm text-muted-foreground">Stock {vehicleImport?.vehicle?.stock_number ?? '—'}</p><p className="text-sm text-muted-foreground">VIN {vehicleImport?.vehicle?.vin ?? '—'}</p></CardContent></Card>
      </div>
    </ImportShell>
  );
}
