import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { ImportRequest } from './types';
import * as React from 'react';

export default function ImportForm({ vehicleImport, action, method = 'post' }: { vehicleImport?: ImportRequest; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    reference_number: vehicleImport?.reference_number ?? '',
    origin_country: vehicleImport?.origin_country ?? '',
    destination_port: vehicleImport?.destination_port ?? '',
    estimated_cost: String(vehicleImport?.estimated_cost ?? ''),
    status: vehicleImport?.status ?? 'pending',
    supplier_id: String(vehicleImport?.supplier_id ?? ''),
    vehicle_id: String(vehicleImport?.vehicle_id ?? ''),
    user_id: String(vehicleImport?.user_id ?? ''),
    request_data: JSON.stringify(vehicleImport?.request_data ?? {}, null, 2),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (method === 'put') {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {method === 'put' && <input type="hidden" name="_method" value="put" />}
      
      <FormSection title="Basic Information" gridCols={3}>
        <FormField
          name="reference_number"
          label="Reference number"
          value={data.reference_number}
          error={errors.reference_number}
          onChange={(value) => setData('reference_number', value)}
        />
        <FormField
          name="origin_country"
          label="Origin country"
          value={data.origin_country}
          error={errors.origin_country}
          onChange={(value) => setData('origin_country', value)}
        />
        <FormField
          name="destination_port"
          label="Destination port"
          value={data.destination_port}
          error={errors.destination_port}
          onChange={(value) => setData('destination_port', value)}
        />
        <FormField
          name="estimated_cost"
          label="Estimated cost"
          type="number"
          step="0.01"
          value={data.estimated_cost}
          error={errors.estimated_cost}
          onChange={(value) => setData('estimated_cost', value)}
        />
        <FormField
          name="status"
          label="Status"
          value={data.status}
          error={errors.status}
          onChange={(value) => setData('status', value)}
        />
        <FormField
          name="supplier_id"
          label="Supplier ID"
          type="number"
          value={data.supplier_id}
          error={errors.supplier_id}
          onChange={(value) => setData('supplier_id', value)}
        />
        <FormField
          name="vehicle_id"
          label="Vehicle ID"
          type="number"
          value={data.vehicle_id}
          error={errors.vehicle_id}
          onChange={(value) => setData('vehicle_id', value)}
        />
        <FormField
          name="user_id"
          label="User ID"
          type="number"
          value={data.user_id}
          error={errors.user_id}
          onChange={(value) => setData('user_id', value)}
        />
      </FormSection>

      <FormSection title="Request Data" gridCols={1} fullWidth>
        <FormField
          name="request_data"
          label="Request data (JSON)"
          type="textarea"
          value={data.request_data}
          error={errors.request_data}
          onChange={(value) => setData('request_data', value)}
          className="font-mono text-xs"
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save import request'}
        </Button>
      </div>
    </form>
  );
}
