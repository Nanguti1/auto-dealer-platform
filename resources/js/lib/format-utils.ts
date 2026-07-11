export function formatCurrency(value?: string | number, currencyInfo?: { currencySymbol: string; exchangeRate: number; currency?: string }): string {
  const numValue = Number(value ?? 0);
  
  // If currency info is provided, use it for conversion and formatting
  if (currencyInfo) {
    const convertedValue = currencyInfo.exchangeRate * numValue;
    const currencyCode = currencyInfo.currency || 'USD';
    
    // Use currency-specific formatting rules
    const formatRules = getCurrencyFormatRules(currencyCode);
    
    const formattedNumber = convertedValue.toLocaleString('en-US', {
      minimumFractionDigits: formatRules.decimalPlaces,
      maximumFractionDigits: formatRules.decimalPlaces,
    });
    
    // Add symbol in the correct position
    if (formatRules.symbolPosition === 'before') {
      return `${currencyInfo.currencySymbol}${formattedNumber}`;
    }
    return `${formattedNumber}${currencyInfo.currencySymbol}`;
  }
  
  // Fallback to USD formatting
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(numValue);
}

// Currency-specific formatting rules
function getCurrencyFormatRules(currencyCode: string): { decimalPlaces: number; symbolPosition: 'before' | 'after' } {
  const rules: Record<string, { decimalPlaces: number; symbolPosition: 'before' | 'after' }> = {
    'USD': { decimalPlaces: 2, symbolPosition: 'before' },
    'KES': { decimalPlaces: 2, symbolPosition: 'before' },
    'UGX': { decimalPlaces: 0, symbolPosition: 'before' },
    'TZS': { decimalPlaces: 2, symbolPosition: 'before' },
    'GBP': { decimalPlaces: 2, symbolPosition: 'before' },
    'EUR': { decimalPlaces: 2, symbolPosition: 'after' },
    'ZAR': { decimalPlaces: 2, symbolPosition: 'before' },
    'NGN': { decimalPlaces: 2, symbolPosition: 'before' },
    'GHS': { decimalPlaces: 2, symbolPosition: 'before' },
    'EGP': { decimalPlaces: 2, symbolPosition: 'before' },
    'RWF': { decimalPlaces: 0, symbolPosition: 'before' },
    'BWP': { decimalPlaces: 2, symbolPosition: 'before' },
    'NAD': { decimalPlaces: 2, symbolPosition: 'before' },
    'ZMW': { decimalPlaces: 2, symbolPosition: 'before' },
    'MZN': { decimalPlaces: 2, symbolPosition: 'before' },
    'AOA': { decimalPlaces: 2, symbolPosition: 'before' },
    'XAF': { decimalPlaces: 0, symbolPosition: 'before' },
    'XOF': { decimalPlaces: 0, symbolPosition: 'before' },
    'CAD': { decimalPlaces: 2, symbolPosition: 'before' },
    'AUD': { decimalPlaces: 2, symbolPosition: 'before' },
    'JPY': { decimalPlaces: 0, symbolPosition: 'before' },
    'CNY': { decimalPlaces: 2, symbolPosition: 'before' },
    'INR': { decimalPlaces: 2, symbolPosition: 'before' },
    'AED': { decimalPlaces: 2, symbolPosition: 'before' },
    'SAR': { decimalPlaces: 2, symbolPosition: 'before' },
  };
  
  return rules[currencyCode] || rules['USD'];
}

export function formatNumber(value?: string | number): string {
  return new Intl.NumberFormat('en-US').format(Number(value ?? 0));
}

export function formatFileSize(bytes?: number): string {
  if (!bytes) {
return '0 B';
}

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
