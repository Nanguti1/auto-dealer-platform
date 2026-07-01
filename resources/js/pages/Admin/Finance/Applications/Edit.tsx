import FinanceForm from '@/components/admin/finance/finance-form';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication } from '@/components/admin/finance/types';
import admin from '@/routes/admin';

export default function Edit({ financeApplication }: { financeApplication: FinanceApplication }) {
  return (
    <FinanceShell title="Edit Finance Application" description={applicantName(financeApplication)} actions={<FinanceBackButton href={admin.financeApplications.show(financeApplication.id).url} />}>
      <FinanceForm financeApplication={financeApplication} action={admin.financeApplications.update.form(financeApplication.id).action} method="put" />
    </FinanceShell>
  );
}
