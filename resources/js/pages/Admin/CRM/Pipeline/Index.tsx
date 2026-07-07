import { Link, router } from '@inertiajs/react';
import adminRoutes from '@/routes/admin';
import CrmShell from '@/components/admin/crm/crm-shell';
import PipelineColumn from '@/components/admin/crm/pipeline-column';
import type { CrmStage, LeadRecord } from '@/components/admin/crm/types';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import * as React from 'react';

export default function Index({ stages = [], leads = [] }: { stages?: CrmStage[]; leads?: LeadRecord[] }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const fallbackStages: CrmStage[] = stages.length ? stages : [{ id: 1, name: 'New', slug: 'new' }, { id: 2, name: 'Contacted', slug: 'contacted' }, { id: 3, name: 'Qualified', slug: 'qualified' }, { id: 4, name: 'Won', slug: 'won' }];

  if (isLoading) {
    return (
      <CrmShell
        title="Sales Pipeline"
        description="Kanban-style pipeline view grouped by backend CRM stages."
        actions={<Button asChild><Link href={adminRoutes.leads.create().url}>Create Lead</Link></Button>}
      >
        <LoadingState message="Loading pipeline..." variant="full-page" />
      </CrmShell>
    );
  }

  if (error) {
    return (
      <CrmShell
        title="Sales Pipeline"
        description="Kanban-style pipeline view grouped by backend CRM stages."
        actions={<Button asChild><Link href={adminRoutes.leads.create().url}>Create Lead</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/crm/pipeline');
          }}
        />
      </CrmShell>
    );
  }

  return (
    <CrmShell
      title="Sales Pipeline"
      description="Kanban-style pipeline view grouped by backend CRM stages."
      actions={<Button asChild><Link href={adminRoutes.leads.create().url}>Create Lead</Link></Button>}
    >
      {leads.length === 0 ? (
        <EmptyGeneric
          title="No leads in pipeline"
          description="Start building your sales pipeline by creating your first lead."
          action={{ label: 'Create Lead', onClick: () => router.visit(adminRoutes.leads.create().url) }}
        />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {fallbackStages.map((stage) => <PipelineColumn key={stage.id} stage={stage} leads={stage.leads ?? leads.filter((lead) => lead.crm_stage_id === stage.id || lead.status === stage.slug)} />)}
        </div>
      )}
    </CrmShell>
  );
}
