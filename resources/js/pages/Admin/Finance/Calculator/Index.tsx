import FinanceShell from '@/components/admin/finance/finance-shell';
import LoanCalculator from '@/components/admin/finance/loan-calculator';

export default function Index({ vehiclePrice = 65000 }: { vehiclePrice?: number }) {
  return (
    <FinanceShell title="Loan Calculator" description="Model loan amount, trade-in deductions, interest, repayment totals, and estimated monthly payment.">
      <LoanCalculator defaultPrice={vehiclePrice} />
    </FinanceShell>
  );
}
