import { Link } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { formatDateTime } from '@/lib/date-utils';
import { formatCurrency } from '@/lib/format-utils';
import InspectionChecklist from '@/components/admin/trade-ins/inspection-checklist';
import TradeInShell, { TradeInBackButton } from '@/components/admin/trade-ins/trade-in-shell';
import TradeInStatusBadge from '@/components/admin/trade-ins/trade-in-status-badge';
import type { TradeInInspection } from '@/components/admin/trade-ins/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ inspection }: { inspection: TradeInInspection }) {
  const tradeInRequest = inspection.tradeInRequest;

  return (
    <TradeInShell 
      title="Vehicle Inspection" 
      description={tradeInRequest ? `${tradeInRequest.year} ${tradeInRequest.make} ${tradeInRequest.model}` : 'Inspection Details'} 
      actions={
        <>
          <TradeInBackButton href={tradeInRequest ? `/admin/trade-ins/${tradeInRequest.id}` : '/admin/inspections'} />
          <Button asChild>
            <Link href={`/admin/inspections/${inspection.id}/edit`}>
              <Pencil className="mr-2 size-4" />Edit inspection
            </Link>
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Inspection Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">Status</p>
              <TradeInStatusBadge status={inspection?.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inspection Date</p>
              <p className="font-medium">{inspection?.inspection_date ? formatDateTime(inspection.inspection_date) : 'Not scheduled'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estimated Repair Cost</p>
              <p className="font-medium">{inspection?.estimated_repair_cost ? formatCurrency(Number(inspection.estimated_repair_cost)) : '—'}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Inspector</p>
              <p className="font-medium">{inspection?.inspector?.name || 'Not assigned'}</p>
            </div>
          </CardContent>
        </Card>
        
        <InspectionChecklist
          values={{
            exterior: inspection?.condition_details?.exterior || {},
            interior: inspection?.condition_details?.interior || {},
            mechanical: inspection?.condition_details?.mechanical || {}
          }}
        />
        
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Repair Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              {inspection?.repair_recommendations || 'No repair recommendations recorded.'}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Inspector Notes</CardTitle>
            </CardHeader>
            <CardContent>
              {inspection?.notes || 'No inspector notes recorded.'}
            </CardContent>
          </Card>
        </div>
      </div>
    </TradeInShell>
  );
}
