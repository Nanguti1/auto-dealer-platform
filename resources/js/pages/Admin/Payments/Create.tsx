import adminRoutes from '@/routes/admin';
import PaymentForm from '@/components/admin/payments/payment-form';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';

export default function Create({ vehicles, reservations, users }: { 
  vehicles: Array<{ id: number; name: string; make: string; model: string; year: number; price: number; stock_number: string }>;
  reservations: Array<{ id: number; vehicle_name: string; customer_name: string; deposit_amount: number }>;
  users: Array<{ id: number; name: string; email: string }>;
}) {
  return (
    <PaymentShell title="Create Payment" description="Record a new customer payment transaction." actions={<PaymentBackButton />}>
      <PaymentForm 
        action={adminRoutes.payments.store().url} 
        vehicles={vehicles}
        reservations={reservations}
        users={users}
      />
    </PaymentShell>
  );
}
