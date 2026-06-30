import { Printer } from 'lucide-react';
import FinanceShell, { FinanceBackButton } from '@/components/admin/finance/finance-shell';
import PaymentSchedule from '@/components/admin/finance/payment-schedule';
import { applicantName } from '@/components/admin/finance/helpers';
import type { FinanceApplication, PaymentInstallment } from '@/components/admin/finance/types';
import { Button } from '@/components/ui/button';

export default function Show({ financeApplication, schedule }: { financeApplication: FinanceApplication; schedule?: PaymentInstallment[] }) {
  return (
    <FinanceShell title="Payment Schedule" description={applicantName(financeApplication)} actions={<><FinanceBackButton href={`/admin/finance-applications/${financeApplication.id}`} /><Button variant="outline" onClick={() => window.print()}><Printer className="mr-2 size-4" />Print</Button></>}>
      <div className="print:block"><PaymentSchedule installments={schedule ?? financeApplication.payment_schedule ?? []} /></div>
    </FinanceShell>
  );
}
