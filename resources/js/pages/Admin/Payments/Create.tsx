import admin from '@/routes/admin';
import PaymentForm from '@/components/admin/payments/payment-form';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';

export default function Create({ vehicles, reservations, customers, users }: { 
  vehicles: Array<{ id: number; name: string; make: string; model: string; year: number; price: number; stock_number: string }>;
  reservations: Array<{ id: number; vehicle_name: string; customer_name: string; deposit_amount: number }>;
  customers: Array<{ id: number; name: string; email: string; customer_number: string }>;
  users: Array<{ id: number; name: string; email: string }>;
}) {
  return (
    <PaymentShell title="Create Payment" description="Record a new customer payment transaction." actions={<PaymentBackButton />}>
      <PaymentForm 
        action={admin.payments.store().url} 
        vehicles={vehicles}
        reservations={reservations}
        customers={customers}
        users={users}
      />
    </PaymentShell>
  );
}
