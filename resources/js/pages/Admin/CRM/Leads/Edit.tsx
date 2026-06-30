import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import LeadForm from '@/components/admin/crm/lead-form';
import { leadName } from '@/components/admin/crm/helpers';
import type { LeadRecord } from '@/components/admin/crm/types';
import { admin } from '@/routes/admin';

export default function Edit({ lead }: { lead: LeadRecord }) {
  return <CrmShell title={`Edit ${leadName(lead)}`} description="Update CRM lead details and pipeline metadata." actions={<CrmBackButton href={admin.leads.show(lead.id).url} />}><LeadForm lead={lead} action={admin.leads.update.form(lead.id).action} method="put" /></CrmShell>;
}
