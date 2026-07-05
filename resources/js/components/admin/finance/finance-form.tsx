import { FormShell, FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import type { FinanceApplication } from './types';

interface FinanceFormProps {
  financeApplication?: FinanceApplication;
  action: string;
  method?: 'post' | 'put';
  users?: Array<{ id: number; name: string; email?: string }>;
  lenders?: Array<{ id: number; name: string }>;
}

export default function FinanceForm({ financeApplication, action, method = 'post', users = [], lenders = [] }: FinanceFormProps) {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const lenderOptions = lenders.map(lender => ({
    value: lender.id,
    label: lender.name || `Lender #${lender.id}`,
  }));

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
          value={String(financeApplication?.down_payment ?? '')}
          onChange={() => {}}
        />
        <FormField
          name="term_months"
          label="Repayment period"
          type="number"
          value={String(financeApplication?.term_months ?? '')}
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
          value={String(financeApplication?.estimated_monthly_payment ?? '')}
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
        <ForeignSelector
          name="assigned_user_id"
          label="Assigned officer"
          value={financeApplication?.assigned_user_id ?? financeApplication?.assignedUser?.id ?? financeApplication?.officer?.id}
          options={userOptions}
          placeholder="Select an officer"
          searchable
        />
        <ForeignSelector
          name="lender_id"
          label="Lender"
          value={financeApplication?.lender_id}
          options={lenderOptions}
          placeholder="Select a lender"
          searchable
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
