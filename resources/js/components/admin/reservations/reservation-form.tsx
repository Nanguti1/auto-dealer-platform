import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import type { ReservationRecord } from './types';

interface ReservationFormProps {
  reservation?: ReservationRecord;
  action: string;
  method?: 'post' | 'put';
  vehicles?: Array<{ id: number; name: string; make: string; model: string; year: number; price: number }>;
  customers?: Array<{ id: number; name: string; email?: string; customer_number?: string }>;
  users?: Array<{ id: number; name: string; email?: string }>;
  cancelUrl?: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'completed', label: 'Completed' },
  { value: 'expired', label: 'Expired' },
];

export default function ReservationForm({ reservation, action, method = 'post', vehicles = [], customers = [], users = [], cancelUrl }: ReservationFormProps) {
  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: vehicle.name || `Vehicle #${vehicle.id}`,
  }));

  const customerOptions = customers.map(customer => ({
    value: customer.id,
    label: customer.name || customer.email || `Customer #${customer.id}`,
  }));

  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const { data, setData, post, put, processing, errors } = useForm({
    vehicle_id: reservation?.vehicle_id ?? '',
    customer_id: reservation?.customer_id ?? '',
    user_id: reservation?.user_id ?? '',
    deposit_amount: reservation?.deposit_amount ?? '',
    status: reservation?.status ?? 'pending',
    expires_at: reservation?.expires_at ?? '',
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {(method === 'put' || method === 'patch') && (
        <input type="hidden" name="_method" value={method} />
      )}

      <FormSection title="Reservation Details" gridCols={3}>
        <ForeignSelector
          name="vehicle_id"
          label="Vehicle"
          value={data.vehicle_id}
          error={errors.vehicle_id}
          options={vehicleOptions}
          placeholder="Select a vehicle"
          searchable
          required
          onChange={(value) => setData('vehicle_id', value)}
        />
        <ForeignSelector
          name="customer_id"
          label="Customer"
          value={data.customer_id}
          error={errors.customer_id}
          options={customerOptions}
          placeholder="Select a customer"
          searchable
          required
          onChange={(value) => setData('customer_id', value)}
        />
        <ForeignSelector
          name="user_id"
          label="User (Optional)"
          value={data.user_id}
          error={errors.user_id}
          options={userOptions}
          placeholder="Select a user"
          searchable
          onChange={(value) => setData('user_id', value)}
        />
        <FormField
          name="deposit_amount"
          label="Deposit Amount"
          type="number"
          step="0.01"
          value={data.deposit_amount}
          error={errors.deposit_amount}
          onChange={(value) => setData('deposit_amount', value)}
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
          name="expires_at"
          label="Expires At"
          type="datetime-local"
          value={data.expires_at}
          error={errors.expires_at}
          onChange={(value) => setData('expires_at', value)}
          className="md:col-span-2"
        />
      </FormSection>

      <div className="flex justify-end gap-4">
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
          {processing ? 'Saving...' : 'Save reservation'}
        </Button>
      </div>
    </form>
  );
}