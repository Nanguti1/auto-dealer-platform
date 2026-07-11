import { useCurrency } from '@/hooks/use-currency';
import * as React from 'react';

interface CurrencyFormatterProps {
  value: number | string;
  className?: string;
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    showSymbol?: boolean;
  };
}

export function CurrencyFormatter({ value, className, options }: CurrencyFormatterProps) {
  const { formatPrice } = useCurrency();
  
  const numValue = Number(value ?? 0);
  const formattedValue = formatPrice(numValue, options);
  
  return <span className={className}>{formattedValue}</span>;
}

export function useFormatCurrency() {
  const { formatPrice } = useCurrency();
  
  return (value: number | string, options?: { minimumFractionDigits?: number; maximumFractionDigits?: number; showSymbol?: boolean }) => {
    const numValue = Number(value ?? 0);
    return formatPrice(numValue, options);
  };
}

// Re-export useCurrency from the hook for convenience
export { useCurrency } from '@/hooks/use-currency';
export type { CurrencyInfo, FormatOptions, UseCurrencyReturn } from '@/hooks/use-currency';

