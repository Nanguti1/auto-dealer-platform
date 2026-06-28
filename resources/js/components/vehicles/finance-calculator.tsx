import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface FinanceCalculatorProps {
    defaultPrice?: number;
    className?: string;
}

export default function FinanceCalculator({ defaultPrice = 50000, className }: FinanceCalculatorProps) {
    const [price, setPrice] = React.useState(defaultPrice);
    const [downPayment, setDownPayment] = React.useState(Math.round(defaultPrice * 0.1));
    const [rate, setRate] = React.useState(5.9);
    const [term, setTerm] = React.useState(60);

    const loanAmount = Math.max(price - downPayment, 0);
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment =
        monthlyRate === 0
            ? loanAmount / term
            : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - loanAmount;

    const format = (n: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>Finance Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                <div className="space-y-2">
                    <Label htmlFor="price">Vehicle Price</Label>
                    <Input id="price" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="down">Down Payment</Label>
                    <Input id="down" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <Label htmlFor="rate">Interest Rate (%)</Label>
                        <Input id="rate" type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="term">Term (months)</Label>
                        <Input id="term" type="number" value={term} onChange={(e) => setTerm(Number(e.target.value))} />
                    </div>
                </div>

                <Separator />

                <div className="rounded-xl bg-primary/5 p-5 text-center">
                    <p className="text-sm text-muted-foreground">Estimated Monthly Payment</p>
                    <p className="text-3xl font-bold tracking-tight text-primary">{format(monthlyPayment)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">per month for {term} months</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-muted-foreground">Loan Amount</p>
                        <p className="font-semibold">{format(loanAmount)}</p>
                    </div>
                    <div>
                        <p className="text-muted-foreground">Total Interest</p>
                        <p className="font-semibold">{format(totalInterest)}</p>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground">
                    * Estimate only. Actual rates and terms may vary based on credit approval.
                </p>
            </CardContent>
        </Card>
    );
}
