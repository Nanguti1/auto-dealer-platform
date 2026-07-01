import CrmShell, { CrmBackButton } from '@/components/admin/crm/crm-shell';
import LeadForm from '@/components/admin/crm/lead-form';
import admin from '@/routes/admin';

export default function Create() {
  return <CrmShell title="Create Lead" description="Capture contact details, source, vehicle interest, owner, status, and score." actions={<CrmBackButton />}><LeadForm action={admin.leads.store.form().action} /></CrmShell>;
}
