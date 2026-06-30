import { Link } from '@inertiajs/react';
import { FileText, Pencil } from 'lucide-react';
import CustomerAvatar from '@/components/admin/customers/customer-avatar';
import TimelineList from '@/components/admin/customers/timeline-list';
import FinanceDocumentCard from '@/components/admin/finance/finance-document-card';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import FinanceStatusBadge from '@/components/admin/finance/finance-status-badge';
import { applicantName, deposit, formatCurrency, formatDateTime, monthlyPayment, officerName, term, vehicleName } from '@/components/admin/finance/helpers';
import type { FinanceApplication } from '@/components/admin/finance/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ financeApplication }: { financeApplication: FinanceApplication }) {
  const timeline = financeApplication.status_timeline ?? financeApplication.timeline ?? [];
  const tradeIn = financeApplication.trade_in ?? financeApplication.tradeIn;

  return (
    <FinanceShell title={applicantName(financeApplication)} description={`Finance application #${financeApplication.id} · Updated ${formatDateTime(financeApplication.updated_at)}`} actions={<><FinanceBackButton /><Button variant="outline" asChild><Link href={`/admin/finance-applications/${financeApplication.id}/documents`}><FileText className="mr-2 size-4" />Documents</Link></Button><Button asChild><Link href={`/admin/finance-applications/${financeApplication.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Customer overview</CardTitle></CardHeader>
          <CardContent className="flex flex-col gap-6 md:flex-row">
            {financeApplication.customer ? <CustomerAvatar customer={financeApplication.customer} /> : null}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div><p className="text-sm text-muted-foreground">Customer</p><p>{applicantName(financeApplication)}</p></div>
              <div><p className="text-sm text-muted-foreground">Email</p><p>{financeApplication.customer?.email ?? financeApplication.user?.email ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Phone</p><p>{financeApplication.customer?.phone ?? financeApplication.user?.phone ?? '—'}</p></div>
              <div><p className="text-sm text-muted-foreground">Assigned officer</p><p>{officerName(financeApplication)}</p></div>
            </div>
          </CardContent>
        </Card>
        <Card><CardHeader><CardTitle>Vehicle details</CardTitle></CardHeader><CardContent className="space-y-2"><p className="font-medium">{vehicleName(financeApplication.vehicle)}</p><p className="text-sm text-muted-foreground">Stock {financeApplication.vehicle?.stock_number ?? '—'}</p><p>VIN {financeApplication.vehicle?.vin ?? '—'}</p><p>{formatCurrency(financeApplication.vehicle?.sale_price ?? financeApplication.vehicle?.price)}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Requested financing</CardTitle></CardHeader><CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><div><p className="text-sm text-muted-foreground">Requested amount</p><p className="font-semibold">{formatCurrency(financeApplication.requested_amount)}</p></div><div><p className="text-sm text-muted-foreground">Deposit</p><p className="font-semibold">{formatCurrency(deposit(financeApplication))}</p></div><div><p className="text-sm text-muted-foreground">Loan term</p><p className="font-semibold">{term(financeApplication) ?? '—'} months</p></div><div><p className="text-sm text-muted-foreground">Interest rate</p><p className="font-semibold">{financeApplication.interest_rate ?? '—'}%</p></div><div><p className="text-sm text-muted-foreground">Monthly payment</p><p className="font-semibold">{formatCurrency(monthlyPayment(financeApplication))}</p></div><div><p className="text-sm text-muted-foreground">Application status</p><FinanceStatusBadge status={financeApplication.status} /></div><div><p className="text-sm text-muted-foreground">Approval status</p><FinanceStatusBadge status={financeApplication.approval_status} /></div><div><p className="text-sm text-muted-foreground">Lender</p><p className="font-semibold">{financeApplication.lender?.name ?? '—'}</p></div></CardContent></Card>
        <Card><CardHeader><CardTitle>Related records</CardTitle></CardHeader><CardContent className="space-y-2 text-sm"><p>Trade-In: {tradeIn ? <Link className="hover:underline" href={`/admin/trade-ins/${tradeIn.id}`}>#{tradeIn.id}</Link> : '—'}</p><p>CRM Lead: {financeApplication.lead ? <Link className="hover:underline" href={`/admin/leads/${financeApplication.lead.id}`}>#{financeApplication.lead.id}</Link> : '—'}</p><p>Reservation: {financeApplication.reservation ? `#${financeApplication.reservation.id} · ${financeApplication.reservation.status ?? 'active'}` : '—'}</p><p>Import Request: {financeApplication.import_request ? `#${financeApplication.import_request.id} · ${financeApplication.import_request.status ?? 'active'}` : '—'}</p></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Status timeline</CardTitle></CardHeader><CardContent><TimelineList events={timeline} /></CardContent></Card>
        <Card><CardHeader><CardTitle>Approval history</CardTitle></CardHeader><CardContent><TimelineList events={financeApplication.approval_history ?? []} /></CardContent></Card>
        <Card className="lg:col-span-2"><CardHeader><CardTitle>Documents</CardTitle></CardHeader><CardContent className="grid gap-4 md:grid-cols-2">{financeApplication.documents?.length ? financeApplication.documents.map((document) => <FinanceDocumentCard key={document.id} document={document} detailsHref={`/admin/finance-applications/${financeApplication.id}/documents/${document.id}`} onDeleteUrl={`/admin/finance-applications/${financeApplication.id}/documents/${document.id}`} />) : <p className="text-sm text-muted-foreground">No finance documents uploaded.</p>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Notes</CardTitle></CardHeader><CardContent className="space-y-2 text-sm">{financeApplication.notes?.length ? financeApplication.notes.map((note) => <p key={note.id}>{note.title ?? note.body ?? note.note}</p>) : <p className="text-muted-foreground">No notes recorded.</p>}</CardContent></Card>
      </div>
    </FinanceShell>
  );
}
