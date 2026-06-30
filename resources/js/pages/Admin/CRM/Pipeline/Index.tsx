import { Link } from '@inertiajs/react';
import CrmShell from '@/components/admin/crm/crm-shell';
import PipelineColumn from '@/components/admin/crm/pipeline-column';
import type { CrmStage, LeadRecord } from '@/components/admin/crm/types';
import { Button } from '@/components/ui/button';

export default function Index({ stages = [], leads = [] }: { stages?: CrmStage[]; leads?: LeadRecord[] }) {
  const fallbackStages: CrmStage[] = stages.length ? stages : [{ id: 1, name: 'New', slug: 'new' }, { id: 2, name: 'Contacted', slug: 'contacted' }, { id: 3, name: 'Qualified', slug: 'qualified' }, { id: 4, name: 'Won', slug: 'won' }];

  return (
    <CrmShell title="Sales Pipeline" description="Kanban-style pipeline view grouped by backend CRM stages." actions={<Button asChild><Link href="/admin/leads/create">Create Lead</Link></Button>}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {fallbackStages.map((stage) => <PipelineColumn key={stage.id} stage={stage} leads={stage.leads ?? leads.filter((lead) => lead.crm_stage_id === stage.id || lead.status === stage.slug)} />)}
      </div>
    </CrmShell>
  );
}
