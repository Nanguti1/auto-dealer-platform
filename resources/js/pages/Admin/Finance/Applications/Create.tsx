import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import FinanceForm from '@/components/admin/finance/finance-form';
import { admin } from '@/routes/admin';

export default function Create() {
  return (
    <FinanceShell title="Create Finance Application" description="Create a new finance application with loan details, terms, and approval information." actions={<FinanceBackButton />}>
      <FinanceForm action={admin.financeApplications.store.form().action} />
    </FinanceShell>
  );
}
