import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LeadCard from './lead-card';
import type { CrmStage, LeadRecord } from './types';

export default function PipelineColumn({ stage, leads = [] }: { stage: CrmStage; leads?: LeadRecord[] }) {
  return (
    <Card className="min-w-80 flex-1 bg-muted/30">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base"><span>{stage.name}</span><span className="rounded-full bg-background px-2 py-1 text-xs text-muted-foreground">{leads.length}</span></CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {leads.length === 0 ? <div className="rounded-lg border border-dashed bg-background p-4 text-center text-sm text-muted-foreground">No leads in this stage.</div> : null}
        {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
      </CardContent>
    </Card>
  );
}
