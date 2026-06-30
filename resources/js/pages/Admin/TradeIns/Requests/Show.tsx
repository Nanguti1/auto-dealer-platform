import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import { desiredVehicle, formatCurrency, formatDateTime, formatNumber, imageUrl, requesterName, tradeInVehicleName, vehicleName } from '@/components/admin/trade-ins/helpers';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';
import ValuationSummary from '@/components/admin/trade-ins/valuation-summary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ tradeInRequest }: { tradeInRequest: TradeInRequest }) {
  const photos = tradeInRequest.photos ?? tradeInRequest.images ?? [];

  return <TradeInShell title={tradeInVehicleName(tradeInRequest)} description={`Request #${tradeInRequest.id} · Updated ${formatDateTime(tradeInRequest.updated_at)}`} actions={<><TradeInBackButton /><Button asChild><Link href={`/admin/trade-ins/${tradeInRequest.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2"><CardHeader><CardTitle>Customer overview</CardTitle></CardHeader><CardContent className="flex flex-col gap-6 md:flex-row">{tradeInRequest.customer ? <CustomerAvatar customer={tradeInRequest.customer} /> : null}<div className="grid flex-1 gap-4 sm:grid-cols-2"><div><p className="text-sm text-muted-foreground">Customer</p><p>{requesterName(tradeInRequest)}</p></div><div><p className="text-sm text-muted-foreground">Email</p><p>{tradeInRequest.customer?.email ?? tradeInRequest.user?.email ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Phone</p><p>{tradeInRequest.customer?.phone ?? tradeInRequest.user?.phone ?? '—'}</p></div><div><p className="text-sm text-muted-foreground">Approval status</p><TradeInStatusBadge status={tradeInRequest.status} /></div></div></CardContent></Card>
      <Card><CardHeader><CardTitle>Current vehicle</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{tradeInVehicleName(tradeInRequest)}</p><p className="text-sm text-muted-foreground">VIN {tradeInRequest.vin ?? '—'}</p><p>{formatNumber(tradeInRequest.mileage)} miles</p><p>{formatCurrency(tradeInRequest.estimated_value)} estimated</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Desired vehicle</CardTitle></CardHeader><CardContent>{vehicleName(desiredVehicle(tradeInRequest))}</CardContent></Card>
      <Card><CardHeader><CardTitle>Inspection summary</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><TradeInStatusBadge status={tradeInRequest.inspection?.status} /><p>Tires: {tradeInRequest.inspection?.tire_condition ?? '—'}</p><p>Engine: {tradeInRequest.inspection?.engine_condition ?? '—'}</p><p>Transmission: {tradeInRequest.inspection?.transmission_condition ?? '—'}</p></CardContent></Card>
      <ValuationSummary valuation={tradeInRequest.valuation} />
      <Card className="lg:col-span-3"><CardHeader><CardTitle>Uploaded vehicle images</CardTitle></CardHeader><CardContent><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{photos.length ? photos.map((photo) => <img key={photo.id} src={imageUrl(photo.url ?? photo.path)} alt={photo.alt_text ?? 'Trade-in vehicle'} className="aspect-video rounded-lg object-cover" />) : <p className="text-sm text-muted-foreground">No vehicle images uploaded.</p>}</div></CardContent></Card>
      <Card><CardHeader><CardTitle>Offer history</CardTitle></CardHeader><CardContent className="space-y-3 text-sm">{tradeInRequest.offers?.length ? tradeInRequest.offers.map((offer) => <div key={offer.id} className="rounded-lg border p-3"><p className="font-medium">{formatCurrency(offer.amount ?? offer.offer_amount)}</p><TradeInStatusBadge status={offer.status} /></div>) : <p className="text-muted-foreground">No offers yet.</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{tradeInRequest.notes?.length ? tradeInRequest.notes.map((note) => <p key={note.id}>{note.title ?? note.body ?? note.note}</p>) : <p className="text-muted-foreground">No notes recorded.</p>}</CardContent></Card>
      <Card><CardHeader><CardTitle>Documents & relationships</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>CRM lead: {tradeInRequest.lead ? <Link className="hover:underline" href={`/admin/leads/${tradeInRequest.lead.id}`}>#{tradeInRequest.lead.id}</Link> : '—'}</p><p>Finance application: {tradeInRequest.finance_application?.status ?? '—'}</p><p>Reservations: {tradeInRequest.reservations?.length ?? 0}</p>{tradeInRequest.documents?.map((document) => <p key={document.id}>{document.title ?? document.name ?? document.file_name}</p>)}</CardContent></Card>
      <Card className="lg:col-span-2"><CardHeader><CardTitle>Timeline</CardTitle></CardHeader><CardContent><TimelineList events={tradeInRequest.timeline ?? []} /></CardContent></Card>
    </div>
  </TradeInShell>;
}
