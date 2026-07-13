import FinanceForm from '@/components/admin/finance/finance-form';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import admin from '@/routes/admin';

export default function Create({ users, lenders, vehicles }: { users: Array<{ id: number; name: string; email?: string }>; lenders: Array<{ id: number; name: string }>; vehicles: Array<{ id: number; make: string; model: string; year: number; price: number }> }) {
  return (
    <FinanceShell title="Create Finance Application" description="Create a new finance application with loan details, terms, and approval information." actions={<FinanceBackButton />}>
      <FinanceForm action={admin.financeApplications.store().url} method="post" users={users} lenders={lenders} vehicles={vehicles} cancelUrl={admin.financeApplications.index().url} />
    </FinanceShell>
  );
}
