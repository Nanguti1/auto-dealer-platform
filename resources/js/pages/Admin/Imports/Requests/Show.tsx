import { Link } from '@inertiajs/react';
import { FileText, Pencil, Ship } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ImportShell, { ImportBackButton } from '@/components/admin/imports/import-shell';
import ImportStatusBadge from '@/components/admin/imports/import-status-badge';
import { formatCurrency, formatDateTime, importVehicleName, requesterName, supplierName, userName, vehicleName } from '@/components/admin/imports/helpers';
import type { ImportRequest } from '@/components/admin/imports/types';

export default function Show({ vehicleImport }: { vehicleImport: ImportRequest }) {
  const timeline = vehicleImport.timeline ?? [];
  const shipment = vehicleImport.shipment ?? vehicleImport.request_data?.shipment;

  return (
    <ImportShell title={importVehicleName(vehicleImport)} description={`Import request #${vehicleImport.id} · Updated ${formatDateTime(vehicleImport.updated_at)}`} actions={<><ImportBackButton /><Button variant="outline" asChild><Link href={`/admin/imports/${vehicleImport.id}/shipments`}><Ship className="mr-2 size-4" />Shipment</Link></Button><Button variant="outline" asChild><Link href={`/admin/imports/${vehicleImport.id}/documents`}><FileText className="mr-2 size-4" />Documents</Link></Button><Button asChild><Link href={`/admin/imports/${vehicleImport.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {vehicleImport.customer ? <CustomerAvatar customer={vehicleImport.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{requesterName(vehicleImport)}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{vehicleImport.customer?.email ?? vehicleImport.user?.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{vehicleImport.customer?.phone ?? vehicleImport.user?.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Assigned officer</p><p>{userName(vehicleImport.assigned_user ?? vehicleImport.assignedUser)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Request status</CardTitle></CardHeader><CardContent className="space-y-2"><ImportStatusBadge status={vehicleImport.status} /><p className="text-sm text-muted-foreground">Current stage: {vehicleImport.current_stage ?? shipment?.status ?? '—'}</p><p className="text-sm text-muted-foreground">Payment status: <ImportStatusBadge status={vehicleImport.payment_status} /></p></CardContent></Card>
        <Card><CardHeader><CardTitle>Requested vehicle</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{importVehicleName(vehicleImport)}</p><p className="text-sm text-muted-foreground">Stock {vehicleImport.vehicle?.stock_number ?? '—'}</p><p className="text-sm text-muted-foreground">VIN {vehicleImport.vehicle?.vin ?? '—'}</p><p className="text-sm text-muted-foreground">{formatCurrency(vehicleImport.estimated_cost ?? vehicleImport.request_data?.estimated_cost)} estimated</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Supplier details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{supplierName(vehicleImport.supplier)}</p><p className="text-sm text-muted-foreground">{vehicleImport.supplier?.email ?? '—'}</p><p className="text-sm text-muted-foreground">{vehicleImport.supplier?.phone ?? '—'}</p><p className="text-sm text-muted-foreground">{vehicleImport.supplier?.country ?? '—'}</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Origin & destination</CardTitle></CardHeader><CardContent className="space-y-2"><p className="text-sm text-muted-foreground">Origin country</p><p>{vehicleImport.origin_country ?? '—'}</p><p className="text-sm text-muted-foreground">Port of loading</p><p>{vehicleImport.port_of_loading ?? shipment?.port_of_loading ?? '—'}</p><p className="text-sm text-muted-foreground">Destination port</p><p>{vehicleImport.destination_port ?? shipment?.destination_port ?? '—'}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Shipment information</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><div><p className="text-sm text-muted-foreground">Shipment reference</p><p>{shipment?.shipment_reference ?? vehicleImport.reference_number ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Container number</p><p>{shipment?.container_number ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Shipping line</p><p>{shipment?.shipping_line ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Vessel</p><p>{shipment?.vessel ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Current location</p><p>{shipment?.current_location ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Estimated arrival</p><p>{formatDateTime(vehicleImport.estimated_arrival ?? shipment?.estimated_arrival)}</p></div><div><p className="text-sm text-muted-foreground">Shipping method</p><p>{vehicleImport.shipping_method ?? vehicleImport.request_data?.shipping_method ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Customs status</p><ImportStatusBadge status={shipment?.customs_status} /></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Tracking</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p className="text-muted-foreground">Shipment events: {shipment?.tracking_events?.length ?? 0}</p><p className="text-muted-foreground">Port history: {vehicleImport.request_data?.port_history?.length ?? 0}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Documents</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">{vehicleImport.documents?.length ? vehicleImport.documents.map((document) => <div key={document.id} className="rounded-lg border p-3"><p className="font-medium">{document.title ?? document.document_type ?? document.file_name}</p><p className="text-sm text-muted-foreground">{document.file_name}</p><ImportStatusBadge status={document.approval_status} /></div>) : <p className="text-sm text-muted-foreground">No documents uploaded.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Payments</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{vehicleImport.payments?.length ? vehicleImport.payments.map((payment) => <div key={payment.id} className="rounded-lg border p-3"><p className="font-medium">{formatCurrency(payment.amount)}</p><p className="text-sm text-muted-foreground">{payment.payment_type}</p><ImportStatusBadge status={payment.status} /></div>) : <p className="text-muted-foreground">No payments recorded.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Related records</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>CRM Lead: {vehicleImport.lead ? <Link className="hover:underline" href={`/admin/leads/${vehicleImport.lead.id}`}>#{vehicleImport.lead.id}</Link> : '—'}</p><p>Finance Application: {vehicleImport.finance_application ? <Link className="hover:underline" href={`/admin/finance-applications/${vehicleImport.finance_application.id}`}>#{vehicleImport.finance_application.id}</Link> : '—'}</p><p>Trade-In: {vehicleImport.trade_in ? <Link className="hover:underline" href={`/admin/trade-ins/${vehicleImport.trade_in.id}`}>#{vehicleImport.trade_in.id}</Link> : '—'}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><TimelineList events={timeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{vehicleImport.notes?.length ? vehicleImport.notes.map((note) => <p key={note.id}>{note.title ?? note.body ?? note.note}</p>) : <p className="text-muted-foreground">No notes recorded.</p>}</CardContent></Card>
      </div>
    </ImportShell>
  );
}
