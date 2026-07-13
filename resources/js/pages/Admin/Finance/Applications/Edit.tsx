import FinanceForm from '@/components/admin/finance/finance-form';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication } from '@/components/admin/finance/types';
import admin from '@/routes/admin';

export default function Edit({ financeApplication, users, lenders }: { financeApplication: FinanceApplication; users: Array<{ id: number; name: string; email?: string }>; lenders: Array<{ id: number; name: string }> }) {
  return (
    <FinanceShell title="Edit Finance Application" description={applicantName(financeApplication)} actions={<FinanceBackButton href={admin.financeApplications.show(financeApplication.id).url} />}>
      <FinanceForm financeApplication={financeApplication} action={admin.financeApplications.update(financeApplication.id).url} method="put" users={users} lenders={lenders} cancelUrl={admin.financeApplications.show(financeApplication.id).url} />
    </FinanceShell>
  );
}
