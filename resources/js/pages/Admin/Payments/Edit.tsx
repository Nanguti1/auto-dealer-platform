import { formatCurrency } from '@/components/admin/payments/helpers';
import PaymentForm from '@/components/admin/payments/payment-form';
import PaymentShell, { PaymentBackButton } from '@/components/admin/payments/payment-shell';
import type { Payment } from '@/components/admin/payments/types';

export default function Edit({ payment, vehicles, reservations, users }: { 
  payment: Payment;
  vehicles: Array<{ id: number; name: string; make: string; model: string; year: number; price: number; stock_number: string }>;
  reservations: Array<{ id: number; vehicle_name: string; customer_name: string; deposit_amount: number }>;
  users: Array<{ id: number; name: string; email: string }>;
}) {
  return (
    <PaymentShell title="Edit Payment" description={`Payment #${payment.id} · ${formatCurrency(payment.amount)}`} actions={<PaymentBackButton href={`/admin/payments/${payment.id}`} />}>
      <PaymentForm 
        payment={payment} 
        action={`/admin/payments/${payment.id}`} 
        vehicles={vehicles}
        reservations={reservations}
        users={users}
      />
    </PaymentShell>
  );
}
