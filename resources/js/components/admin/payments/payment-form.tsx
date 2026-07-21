import { useForm } from '@inertiajs/react';
import { FormField, FormSection, ForeignSelector } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Payment } from './types';

interface PaymentFormProps {
  payment?: Payment;
  action: string;
  vehicles?: Array<{ id: number; name: string; make: string; model: string; year: number; price: number; stock_number: string }>;
  reservations?: Array<{ id: number; vehicle_name: string; customer_name: string; deposit_amount: number }>;
  customers?: Array<{ id: number; name: string; email: string; customer_number: string }>;
  users?: Array<{ id: number; name: string; email: string }>;
}

const paymentMethodOptions = [
  { value: 'cash', label: 'Cash' },
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'check', label: 'Check' },
  { value: 'financing', label: 'Financing' },
  { value: 'online', label: 'Online Payment' },
];

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'refunded', label: 'Refunded' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function PaymentForm({ payment, action, vehicles = [], reservations = [], customers = [], users = [] }: PaymentFormProps) {
  const { data, setData, post, put, processing, errors } = useForm({
    user_id: payment?.user_id ?? '',
    customer_id: payment?.customer_id ?? '',
    vehicle_id: payment?.vehicle_id ?? '',
    vehicle_reservation_id: payment?.vehicle_reservation_id ?? '',
    amount: payment?.amount ?? '',
    currency: payment?.currency ?? 'USD',
    method: payment?.method ?? '',
    status: payment?.status ?? 'pending',
    transaction_reference: payment?.transaction_reference ?? '',
    paid_at: payment?.paid_at ? new Date(payment.paid_at).toISOString().slice(0, 16) : '',
    notes: payment?.metadata?.notes ?? '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Include notes in metadata and remove from root level
    const { notes, ...formDataWithoutNotes } = data;
    const formData = {
      ...formDataWithoutNotes,
      metadata: {
        ...payment?.metadata,
        notes: notes,
      },
    };
    
    if (payment) {
      put(action, formData);
    } else {
      post(action, formData);
    }
  };

  const vehicleOptions = vehicles.map(vehicle => ({
    value: vehicle.id,
    label: `${vehicle.name} - ${vehicle.stock_number}`,
  }));

  const reservationOptions = reservations.map(reservation => ({
    value: reservation.id,
    label: `${reservation.vehicle_name} - ${reservation.customer_name} ($${reservation.deposit_amount})`,
  }));

  const userOptions = users.map(user => ({
    value: user.id,
    label: user.name || user.email || `User #${user.id}`,
  }));

  const customerOptions = customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.customer_number || 'No number'}) - ${customer.email || 'No email'}`,
  }));

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {(payment) && (
        <input type="hidden" name="_method" value="put" />
      )}

      <FormSection title="References" gridCols={2}>
        <ForeignSelector
          name="customer_id"
          label="Customer"
          value={data.customer_id}
          error={errors.customer_id}
          options={customerOptions}
          placeholder="Select a customer"
          searchable
          onChange={(value) => setData('customer_id', value)}
        />
        <ForeignSelector
          name="user_id"
          label="User"
          value={data.user_id}
          error={errors.user_id}
          options={userOptions}
          placeholder="Select a user"
          searchable
          onChange={(value) => setData('user_id', value)}
        />
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
          name="vehicle_reservation_id"
          label="Reservation"
          value={data.vehicle_reservation_id}
          error={errors.vehicle_reservation_id}
          options={reservationOptions}
          placeholder="Select a reservation"
          searchable
          onChange={(value) => setData('vehicle_reservation_id', value)}
        />
      </FormSection>

      <FormSection title="Payment Details" gridCols={2}>
        <FormField
          name="amount"
          label="Amount"
          type="number"
          step="0.01"
          value={data.amount}
          error={errors.amount}
          onChange={(value) => setData('amount', value)}
        />
        <FormField
          name="currency"
          label="Currency"
          value={data.currency}
          error={errors.currency}
          onChange={(value) => setData('currency', value)}
        />
        <FormField
          name="method"
          label="Payment method"
          type="select"
          value={data.method}
          error={errors.method}
          options={paymentMethodOptions}
          onChange={(value) => setData('method', value)}
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
          name="transaction_reference"
          label="Transaction reference"
          value={data.transaction_reference}
          error={errors.transaction_reference}
          onChange={(value) => setData('transaction_reference', value)}
        />
        <FormField
          name="paid_at"
          label="Payment date"
          type="datetime-local"
          value={data.paid_at}
          error={errors.paid_at}
          onChange={(value) => setData('paid_at', value)}
        />
      </FormSection>

      <FormSection title="Additional Information" gridCols={1}>
        <FormField
          name="notes"
          label="Notes"
          type="textarea"
          value={data.notes}
          error={errors.notes}
          onChange={(value) => setData('notes', value)}
        />
      </FormSection>

      <div className="flex justify-end gap-4">
        <Button
          type="submit"
          disabled={processing}
        >
          <Save className="mr-2 h-4 w-4" />
          {processing ? 'Saving...' : 'Save Payment'}
        </Button>
      </div>
    </form>
  );
}
