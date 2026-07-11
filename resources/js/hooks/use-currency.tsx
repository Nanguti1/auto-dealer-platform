import { usePage } from '@inertiajs/react';

export type CurrencyInfo = {
  readonly country: string;
  readonly currency: string;
  readonly currencySymbol: string;
  readonly exchangeRate: number;
};

export type UseCurrencyReturn = {
  readonly currency: CurrencyInfo;
  readonly formatPrice: (price: number, options?: FormatOptions) => string;
  readonly convertFromUSD: (usdPrice: number) => number;
  readonly formatUSD: (usdPrice: number, options?: FormatOptions) => string;
  readonly getSymbol: () => string;
  readonly getCurrencyCode: () => string;
  readonly getCountry: () => string;
  readonly getExchangeRate: () => number;
};

export type FormatOptions = {
  readonly minimumFractionDigits?: number;
  readonly maximumFractionDigits?: number;
  readonly showSymbol?: boolean;
  readonly locale?: string;
};

const DEFAULT_CURRENCY: CurrencyInfo = {
  country: 'US',
  currency: 'USD',
  currencySymbol: '$',
  exchangeRate: 1,
};

// Currency-specific formatting rules
const CURRENCY_FORMATS: Record<string, { decimalPlaces: number; symbolPosition: 'before' | 'after'; decimalSeparator: string; thousandsSeparator: string }> = {
  'USD': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'KES': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'UGX': { decimalPlaces: 0, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'TZS': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'GBP': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'EUR': { decimalPlaces: 2, symbolPosition: 'after', decimalSeparator: ',', thousandsSeparator: '.' },
  'ZAR': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'NGN': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'GHS': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'EGP': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'RWF': { decimalPlaces: 0, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'BWP': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'NAD': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'ZMW': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'MZN': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'AOA': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'XAF': { decimalPlaces: 0, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'XOF': { decimalPlaces: 0, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'CAD': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'AUD': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'JPY': { decimalPlaces: 0, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'CNY': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'INR': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'AED': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
  'SAR': { decimalPlaces: 2, symbolPosition: 'before', decimalSeparator: '.', thousandsSeparator: ',' },
};

export function useCurrency(): UseCurrencyReturn {
  const { props } = usePage();
  
  // Get currency info from page props (set by middleware)
  const currencyInfo = (props.currency as CurrencyInfo) || DEFAULT_CURRENCY;

  const formatPrice = (price: number, options: FormatOptions = {}): string => {
    const {
      minimumFractionDigits = 0,
      maximumFractionDigits = 2,
      showSymbol = true,
      locale = 'en-US',
    } = options;

    const convertedPrice = currencyInfo.exchangeRate * price;
    const formatRules = CURRENCY_FORMATS[currencyInfo.currency] || CURRENCY_FORMATS['USD'];

    // Format the number according to currency-specific rules
    const formattedNumber = convertedPrice.toLocaleString(locale, {
      minimumFractionDigits: formatRules.decimalPlaces,
      maximumFractionDigits: formatRules.decimalPlaces,
    });

    if (!showSymbol) {
      return formattedNumber;
    }

    // Add symbol in the correct position
    if (formatRules.symbolPosition === 'before') {
      return `${currencyInfo.currencySymbol}${formattedNumber}`;
    }
    return `${formattedNumber}${currencyInfo.currencySymbol}`;
  };

  const convertFromUSD = (usdPrice: number): number => {
    return currencyInfo.exchangeRate * usdPrice;
  };

  const formatUSD = (usdPrice: number, options: FormatOptions = {}): string => {
    return formatPrice(usdPrice, options);
  };

  const getSymbol = (): string => {
    return currencyInfo.currencySymbol;
  };

  const getCurrencyCode = (): string => {
    return currencyInfo.currency;
  };

  const getCountry = (): string => {
    return currencyInfo.country;
  };

  const getExchangeRate = (): number => {
    return currencyInfo.exchangeRate;
  };

  return {
    currency: currencyInfo,
    formatPrice,
    convertFromUSD,
    formatUSD,
    getSymbol,
    getCurrencyCode,
    getCountry,
    getExchangeRate,
  } as const;
}

// Helper function to format price without hook (for non-React contexts)
export function formatCurrency(price: number, currencyInfo: CurrencyInfo, options: FormatOptions = {}): string {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    showSymbol = true,
    locale = 'en-US',
  } = options;

  const convertedPrice = currencyInfo.exchangeRate * price;
  const formatRules = CURRENCY_FORMATS[currencyInfo.currency] || CURRENCY_FORMATS['USD'];

  const formattedNumber = convertedPrice.toLocaleString(locale, {
    minimumFractionDigits: formatRules.decimalPlaces,
    maximumFractionDigits: formatRules.decimalPlaces,
  });

  if (!showSymbol) {
    return formattedNumber;
  }

  if (formatRules.symbolPosition === 'before') {
    return `${currencyInfo.currencySymbol}${formattedNumber}`;
  }
  return `${formattedNumber}${currencyInfo.currencySymbol}`;
}

// Helper function to convert USD to local currency
export function convertUSDToLocal(usdPrice: number, currencyInfo: CurrencyInfo): number {
  return currencyInfo.exchangeRate * usdPrice;
}

// Helper function to get currency symbol
export function getCurrencySymbol(currencyInfo: CurrencyInfo): string {
  return currencyInfo.currencySymbol;
}

// Helper function to get currency code
export function getCurrencyCode(currencyInfo: CurrencyInfo): string {
  return currencyInfo.currency;
}
