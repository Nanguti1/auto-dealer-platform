import FinanceForm from '@/components/admin/finance/finance-form';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication } from '@/components/admin/finance/types';

export default function Edit({ financeApplication }: { financeApplication: FinanceApplication }) {
  return (
    <FinanceShell title="Edit Finance Application" description={applicantName(financeApplication)} actions={<FinanceBackButton href={`/admin/finance-applications/${financeApplication.id}`} />}>
      <FinanceForm financeApplication={financeApplication} action={`/admin/finance-applications/${financeApplication.id}`} />
    </FinanceShell>
  );
}
