import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import LeadForm from '@/components/admin/crm/lead-form';
import admin from '@/routes/admin';

export default function Create({ vehicles, users, crmStages }: { vehicles: Array<{ id: number; name: string; make: string; model: string; year: number; price: number }>; users: Array<{ id: number; name: string; email?: string }>; crmStages: Array<{ id: number; name: string; pipeline_id?: number }> }) {
  return (
    <CrmShell title="Create Lead" description="Capture contact details, source, vehicle interest, owner, status, and score." actions={<CrmBackButton />}>
      <LeadForm action={admin.leads.store().url} method="post" vehicles={vehicles} users={users} crmStages={crmStages} cancelUrl={admin.leads.index().url} />
    </CrmShell>
  );
}
