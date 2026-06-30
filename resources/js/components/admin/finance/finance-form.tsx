import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { FinanceApplication } from './types';

export default function FinanceForm({ financeApplication, action, method = 'post' }: { financeApplication?: FinanceApplication; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method="post" className="grid max-w-4xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="requested_amount">Requested amount</Label>
              <Input id="requested_amount" name="requested_amount" type="number" defaultValue={financeApplication?.requested_amount ?? ''} />
              <InputError message={errors.requested_amount} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="down_payment">Deposit</Label>
              <Input id="down_payment" name="down_payment" type="number" defaultValue={financeApplication?.down_payment ?? financeApplication?.deposit ?? ''} />
              <InputError message={errors.down_payment ?? errors.deposit} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="term_months">Repayment period</Label>
              <Input id="term_months" name="term_months" type="number" defaultValue={financeApplication?.term_months ?? financeApplication?.loan_term ?? ''} />
              <InputError message={errors.term_months ?? errors.loan_term} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interest_rate">Interest rate</Label>
              <Input id="interest_rate" name="interest_rate" type="number" step="0.01" defaultValue={financeApplication?.interest_rate ?? ''} />
              <InputError message={errors.interest_rate} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimated_monthly_payment">Monthly payment</Label>
              <Input id="estimated_monthly_payment" name="estimated_monthly_payment" type="number" defaultValue={financeApplication?.estimated_monthly_payment ?? financeApplication?.monthly_payment ?? ''} />
              <InputError message={errors.estimated_monthly_payment ?? errors.monthly_payment} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" name="status" defaultValue={financeApplication?.status ?? 'pending'} />
              <InputError message={errors.status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="approval_status">Approval status</Label>
              <Input id="approval_status" name="approval_status" defaultValue={financeApplication?.approval_status ?? 'pending'} />
              <InputError message={errors.approval_status} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="assigned_user_id">Assigned officer ID</Label>
              <Input id="assigned_user_id" name="assigned_user_id" type="number" defaultValue={String(financeApplication?.assigned_user?.id ?? financeApplication?.assignedUser?.id ?? financeApplication?.officer?.id ?? '')} />
              <InputError message={errors.assigned_user_id} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lender_id">Lender ID</Label>
              <Input id="lender_id" name="lender_id" type="number" defaultValue={String(financeApplication?.lender_id ?? financeApplication?.lender?.id ?? '')} />
              <InputError message={errors.lender_id} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" rows={5} defaultValue={String(financeApplication?.notes?.[0]?.body ?? financeApplication?.notes?.[0]?.note ?? '')} />
            <InputError message={errors.notes} />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save finance application'}</Button>
        </>
      )}
    </Form>
  );
}
