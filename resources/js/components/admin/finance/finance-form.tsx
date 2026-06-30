import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { FinanceApplication } from './types';

export default function FinanceForm({ financeApplication, action, method = 'post' }: { financeApplication?: FinanceApplication; action: string; method?: 'post' | 'put' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save finance application"
      className="max-w-4xl"
    >
      <FormSection title="Loan Details" gridCols={3}>
        <FormField
          name="requested_amount"
          label="Requested amount"
          type="number"
          value={String(financeApplication?.requested_amount ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="down_payment"
          label="Deposit"
          type="number"
          value={String(financeApplication?.down_payment ?? financeApplication?.deposit ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="term_months"
          label="Repayment period"
          type="number"
          value={String(financeApplication?.term_months ?? financeApplication?.loan_term ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="interest_rate"
          label="Interest rate"
          type="number"
          step="0.01"
          value={String(financeApplication?.interest_rate ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="estimated_monthly_payment"
          label="Monthly payment"
          type="number"
          value={String(financeApplication?.estimated_monthly_payment ?? financeApplication?.monthly_payment ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="status"
          label="Status"
          value={financeApplication?.status ?? 'pending'}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Approval & Assignment" gridCols={3}>
        <FormField
          name="approval_status"
          label="Approval status"
          value={financeApplication?.approval_status ?? 'pending'}
          onChange={() => {}}
        />
        <FormField
          name="assigned_user_id"
          label="Assigned officer ID"
          type="number"
          value={String(financeApplication?.assigned_user?.id ?? financeApplication?.assignedUser?.id ?? financeApplication?.officer?.id ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="lender_id"
          label="Lender ID"
          type="number"
          value={String(financeApplication?.lender_id ?? financeApplication?.lender?.id ?? '')}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={String(financeApplication?.notes?.[0]?.body ?? financeApplication?.notes?.[0]?.note ?? '')}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
