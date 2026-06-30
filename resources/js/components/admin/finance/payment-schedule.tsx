import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/design-system/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FinanceStatusBadge from './finance-status-badge';
import { formatCurrency, formatDate, installmentNumber } from './helpers';
import type { PaymentInstallment } from './types';

export default function PaymentSchedule({ installments = [] }: { installments?: PaymentInstallment[] }) {
  return (
    <Card>
      <CardHeader><CardTitle>Installment schedule</CardTitle></CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-xl border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Due date</TableHead>
                <TableHead>Principal</TableHead>
                <TableHead>Interest</TableHead>
                <TableHead>Remaining balance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {installments.length ? installments.map((installment, index) => (
                <TableRow key={installment.id ?? index}>
                  <TableCell>{installmentNumber(installment, index)}</TableCell>
                  <TableCell>{formatDate(installment.due_date ?? installment.due_at)}</TableCell>
                  <TableCell>{formatCurrency(installment.principal)}</TableCell>
                  <TableCell>{formatCurrency(installment.interest)}</TableCell>
                  <TableCell>{formatCurrency(installment.remaining_balance ?? installment.balance)}</TableCell>
                  <TableCell><FinanceStatusBadge status={installment.status} /></TableCell>
                </TableRow>
              )) : <TableRow><TableCell colSpan={6} className="py-10 text-center text-muted-foreground">No payment schedule has been generated.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
