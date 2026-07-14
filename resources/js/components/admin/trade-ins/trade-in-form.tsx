import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { TradeInRequest } from './types';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'completed', label: 'Completed' },
];

export default function TradeInForm({ tradeInRequest, action, method = 'post' }: { tradeInRequest?: TradeInRequest; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, errors, processing } = useForm({
    year: tradeInRequest?.year ?? '',
    make: tradeInRequest?.make ?? '',
    model: tradeInRequest?.model ?? '',
    vin: tradeInRequest?.vin ?? '',
    mileage: tradeInRequest?.mileage ?? '',
    status: tradeInRequest?.status ?? 'pending',
    estimated_value: tradeInRequest?.estimated_value ?? '',
    offered_value: tradeInRequest?.offered_value ?? '',
    condition_report: typeof tradeInRequest?.condition_report === 'string' 
      ? tradeInRequest.condition_report 
      : tradeInRequest?.condition_report?.notes ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert plain text to JSON structure before submit
    const submitData = {
      ...data,
      condition_report: data.condition_report ? { notes: data.condition_report } : null,
    };
    
    if (tradeInRequest) {
      put(action, submitData);
    } else {
      post(action, submitData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {tradeInRequest && <input type="hidden" name="_method" value={method} />}
      <FormSection title="Vehicle Information" gridCols={3}>
        <FormField
          name="year"
          label="Year"
          type="number"
          value={data.year}
          error={errors.year}
          onChange={(value) => setData('year', value)}
        />
        <FormField
          name="make"
          label="Make"
          value={data.make}
          error={errors.make}
          onChange={(value) => setData('make', value)}
        />
        <FormField
          name="model"
          label="Model"
          value={data.model}
          error={errors.model}
          onChange={(value) => setData('model', value)}
        />
        <FormField
          name="vin"
          label="VIN"
          value={data.vin}
          error={errors.vin}
          onChange={(value) => setData('vin', value)}
        />
        <FormField
          name="mileage"
          label="Mileage"
          type="number"
          value={data.mileage}
          error={errors.mileage}
          onChange={(value) => setData('mileage', value)}
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
        <FormField
          name="estimated_value"
          label="Estimated value"
          type="number"
          value={data.estimated_value}
          error={errors.estimated_value}
          onChange={(value) => setData('estimated_value', value)}
        />
        <FormField
          name="offered_value"
          label="Offered value"
          type="number"
          value={data.offered_value}
          error={errors.offered_value}
          onChange={(value) => setData('offered_value', value)}
        />
      </FormSection>

      <FormSection title="Condition Report" gridCols={1} fullWidth>
        <FormField
          name="condition_report"
          label="Condition report"
          type="textarea"
          value={typeof data.condition_report === 'string' ? data.condition_report : data.condition_report?.notes ?? ''}
          error={errors.condition_report}
          onChange={(value) => setData('condition_report', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          disabled={processing}
        >
          <Save className="mr-2 h-4 w-4" />
          {processing ? 'Saving...' : 'Save trade-in request'}
        </Button>
      </div>
    </form>
  );
}
