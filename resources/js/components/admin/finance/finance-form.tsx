import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import type { FinanceApplication } from './types';

interface FinanceFormProps {
  financeApplication?: FinanceApplication;
  action: string;
  method?: 'post' | 'put';
  users?: Array<{ id: number; name: string; email?: string }>;
  lenders?: Array<{ id: number; name: string }>;
  vehicles?: Array<{ id: number; name: string; make: string; model: string; year: number; price: number }>;
  cancelUrl?: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'in_review', label: 'In Review' },
  { value: 'funded', label: 'Funded' },
];

const approvalStatusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'needs_review', label: 'Needs Review' },
];

export default function FinanceForm({ financeApplication, action, method = 'post', users = [], lenders = [], vehicles = [], cancelUrl }: FinanceFormProps) {
  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const lenderOptions = lenders.map(lender => ({
    value: lender.id,
    label: lender.name || `Lender #${lender.id}`,
  }));

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.name || `${vehicle.year} ${vehicle.make} ${vehicle.model} - $${vehicle.price?.toLocaleString() || 'N/A'}`,
  }));

  const { data, setData, post, put, processing, errors } = useForm({
    vehicle_id: financeApplication?.vehicle_id ?? '',
    user_id: financeApplication?.user_id ?? '',
    requested_amount: financeApplication?.requested_amount ?? '',
    down_payment: financeApplication?.down_payment ?? '',
    term_months: financeApplication?.term_months ?? '',
    interest_rate: financeApplication?.interest_rate ?? '',
    estimated_monthly_payment: financeApplication?.estimated_monthly_payment ?? '',
    status: financeApplication?.status ?? 'pending',
    approval_status: financeApplication?.approval_status ?? 'pending',
    assigned_user_id: financeApplication?.assigned_user_id ?? financeApplication?.assignedUser?.id ?? financeApplication?.officer?.id ?? '',
    lender_id: financeApplication?.lender_id ?? '',
    notes: String(financeApplication?.notes?.[0]?.body ?? financeApplication?.notes?.[0]?.note ?? ''),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'post') {
      post(action);
    } else {
      put(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      {(method === 'put' || method === 'patch') && (
        <input type="hidden" name="_method" value={method} />
      )}

      <FormSection title="Application Details" gridCols={2}>
        <ForeignSelector
          name="vehicle_id"
          label="Vehicle"
          value={data.vehicle_id}
          error={errors.vehicle_id}
          options={vehicleOptions}
          placeholder="Select a vehicle"
          searchable
          onChange={(value) => setData('vehicle_id', value)}
        />
        <ForeignSelector
          name="user_id"
          label="Customer"
          value={data.user_id}
          error={errors.user_id}
          options={userOptions}
          placeholder="Select a customer"
          searchable
          onChange={(value) => setData('user_id', value)}
        />
      </FormSection>

      <FormSection title="Loan Details" gridCols={3}>
        <FormField
          name="requested_amount"
          label="Requested amount"
          type="number"
          value={data.requested_amount}
          error={errors.requested_amount}
          onChange={(value) => setData('requested_amount', value)}
        />
        <FormField
          name="down_payment"
          label="Deposit"
          type="number"
          value={data.down_payment}
          error={errors.down_payment}
          onChange={(value) => setData('down_payment', value)}
        />
        <FormField
          name="term_months"
          label="Repayment period"
          type="number"
          value={data.term_months}
          error={errors.term_months}
          onChange={(value) => setData('term_months', value)}
        />
        <FormField
          name="interest_rate"
          label="Interest rate"
          type="number"
          step="0.01"
          value={data.interest_rate}
          error={errors.interest_rate}
          onChange={(value) => setData('interest_rate', value)}
        />
        <FormField
          name="estimated_monthly_payment"
          label="Monthly payment"
          type="number"
          value={data.estimated_monthly_payment}
          error={errors.estimated_monthly_payment}
          onChange={(value) => setData('estimated_monthly_payment', value)}
        />
        <FormField
          name="status"
          label="Status"
          type="select"
          value={data.status}
          error={errors.status}
          options={statusOptions}
          onChange={(value) => setData('status', value)}
        />
      </FormSection>

      <FormSection title="Approval & Assignment" gridCols={3}>
        <FormField
          name="approval_status"
          label="Approval status"
          type="select"
          value={data.approval_status}
          error={errors.approval_status}
          options={approvalStatusOptions}
          onChange={(value) => setData('approval_status', value)}
        />
        <ForeignSelector
          name="assigned_user_id"
          label="Assigned officer"
          value={data.assigned_user_id}
          error={errors.assigned_user_id}
          options={userOptions}
          placeholder="Select an officer"
          searchable
          onChange={(value) => setData('assigned_user_id', value)}
        />
        <ForeignSelector
          name="lender_id"
          label="Lender"
          value={data.lender_id}
          error={errors.lender_id}
          options={lenderOptions}
          placeholder="Select a lender"
          searchable
          onChange={(value) => setData('lender_id', value)}
        />
      </FormSection>

      <FormSection title="Notes" gridCols={1} fullWidth>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={data.notes}
          error={errors.notes}
          onChange={(value) => setData('notes', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4 mt-6">
        {cancelUrl && (
          <Button type="button" variant="outline" asChild>
            <a href={cancelUrl}>
              <X className="mr-2 size-4" />
              Cancel
            </a>
          </Button>
        )}
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save finance application'}
        </Button>
      </div>
    </form>
  );
}
