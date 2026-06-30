import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from './helpers';

function calculatePayment(loanAmount: number, annualRate: number, months: number): number {
  if (months <= 0) {
return 0;
}

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
return loanAmount / months;
}

  return (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

export default function LoanCalculator({ defaultPrice = 65000 }: { defaultPrice?: number }) {
  const [vehiclePrice, setVehiclePrice] = React.useState(defaultPrice);
  const [deposit, setDeposit] = React.useState(Math.round(defaultPrice * 0.1));
  const [tradeInDeduction, setTradeInDeduction] = React.useState(0);
  const [interestRate, setInterestRate] = React.useState(6.25);
  const [loanTerm, setLoanTerm] = React.useState(60);

  const loanAmount = Math.max(vehiclePrice - deposit - tradeInDeduction, 0);
  const monthlyPayment = calculatePayment(loanAmount, interestRate, loanTerm);
  const totalRepayment = monthlyPayment * loanTerm;
  const totalInterest = Math.max(totalRepayment - loanAmount, 0);
  const principalPercent = totalRepayment > 0 ? Math.round((loanAmount / totalRepayment) * 100) : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader><CardTitle>Loan inputs</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2"><Label htmlFor="vehicle_price">Vehicle price</Label><Input id="vehicle_price" type="number" value={vehiclePrice} onChange={(event) => setVehiclePrice(Number(event.target.value))} /></div>
          <div className="space-y-2"><Label htmlFor="deposit">Deposit</Label><Input id="deposit" type="number" value={deposit} onChange={(event) => setDeposit(Number(event.target.value))} /></div>
          <div className="space-y-2"><Label htmlFor="trade_in_deduction">Trade-In deduction</Label><Input id="trade_in_deduction" type="number" value={tradeInDeduction} onChange={(event) => setTradeInDeduction(Number(event.target.value))} /></div>
          <div className="space-y-2"><Label htmlFor="interest_rate">Interest rate (%)</Label><Input id="interest_rate" type="number" step="0.01" value={interestRate} onChange={(event) => setInterestRate(Number(event.target.value))} /></div>
          <div className="space-y-2"><Label htmlFor="loan_term">Loan term (months)</Label><Input id="loan_term" type="number" value={loanTerm} onChange={(event) => setLoanTerm(Number(event.target.value))} /></div>
          <div className="space-y-2"><Label>Loan amount</Label><div className="rounded-md border bg-muted/40 px-3 py-2 font-medium">{formatCurrency(loanAmount)}</div></div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Estimated payment</CardTitle></CardHeader>
        <CardContent className="space-y-5">
          <div className="rounded-xl bg-primary/5 p-5 text-center"><p className="text-sm text-muted-foreground">Monthly payment</p><p className="text-3xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p><p className="text-xs text-muted-foreground">for {loanTerm} months</p></div>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Total repayment</span><span className="font-medium">{formatCurrency(totalRepayment)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total interest</span><span className="font-medium">{formatCurrency(totalInterest)}</span></div>
          </div>
          <Separator />
          <div className="space-y-2"><div className="flex justify-between text-xs text-muted-foreground"><span>Principal</span><span>Interest</span></div><div className="h-2 overflow-hidden rounded-full bg-muted" aria-label="Principal share of repayment"><div className="h-full rounded-full bg-primary" style={{ width: `${principalPercent}%` }} /></div></div>
        </CardContent>
      </Card>
    </div>
  );
}
