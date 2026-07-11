<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Default Currency
    |--------------------------------------------------------------------------
    |
    | The default currency used throughout the application. All prices in the
    | database are stored in this currency (USD).
    |
    */
    'default' => 'USD',

    /*
    |--------------------------------------------------------------------------
    | Supported Currencies
    |--------------------------------------------------------------------------
    |
    | List of supported currencies with their symbols, decimal places, and
    | formatting information. Add new currencies here as needed.
    |
    */
    'currencies' => [
        'USD' => [
            'name' => 'US Dollar',
            'symbol' => '$',
            'code' => 'USD',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before', // 'before' or 'after'
        ],
        'KES' => [
            'name' => 'Kenyan Shilling',
            'symbol' => 'KSh',
            'code' => 'KES',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'UGX' => [
            'name' => 'Ugandan Shilling',
            'symbol' => 'UGX',
            'code' => 'UGX',
            'decimal_places' => 0,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'TZS' => [
            'name' => 'Tanzanian Shilling',
            'symbol' => 'TZS',
            'code' => 'TZS',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'GBP' => [
            'name' => 'British Pound',
            'symbol' => '£',
            'code' => 'GBP',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'EUR' => [
            'name' => 'Euro',
            'symbol' => '€',
            'code' => 'EUR',
            'decimal_places' => 2,
            'decimal_separator' => ',',
            'thousands_separator' => '.',
            'symbol_position' => 'after',
        ],
        'ZAR' => [
            'name' => 'South African Rand',
            'symbol' => 'R',
            'code' => 'ZAR',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'NGN' => [
            'name' => 'Nigerian Naira',
            'symbol' => '₦',
            'code' => 'NGN',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'GHS' => [
            'name' => 'Ghanaian Cedi',
            'symbol' => 'GH₵',
            'code' => 'GHS',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'EGP' => [
            'name' => 'Egyptian Pound',
            'symbol' => 'E£',
            'code' => 'EGP',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'RWF' => [
            'name' => 'Rwandan Franc',
            'symbol' => 'RF',
            'code' => 'RWF',
            'decimal_places' => 0,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'BWP' => [
            'name' => 'Botswanan Pula',
            'symbol' => 'P',
            'code' => 'BWP',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'NAD' => [
            'name' => 'Namibian Dollar',
            'symbol' => 'N$',
            'code' => 'NAD',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'ZMW' => [
            'name' => 'Zambian Kwacha',
            'symbol' => 'ZK',
            'code' => 'ZMW',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'MZN' => [
            'name' => 'Mozambican Metical',
            'symbol' => 'MT',
            'code' => 'MZN',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'AOA' => [
            'name' => 'Angolan Kwanza',
            'symbol' => 'Kz',
            'code' => 'AOA',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'XAF' => [
            'name' => 'Central African CFA Franc',
            'symbol' => 'FCFA',
            'code' => 'XAF',
            'decimal_places' => 0,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'XOF' => [
            'name' => 'West African CFA Franc',
            'symbol' => 'CFA',
            'code' => 'XOF',
            'decimal_places' => 0,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'CAD' => [
            'name' => 'Canadian Dollar',
            'symbol' => 'C$',
            'code' => 'CAD',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'AUD' => [
            'name' => 'Australian Dollar',
            'symbol' => 'A$',
            'code' => 'AUD',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'JPY' => [
            'name' => 'Japanese Yen',
            'symbol' => '¥',
            'code' => 'JPY',
            'decimal_places' => 0,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'CNY' => [
            'name' => 'Chinese Yuan',
            'symbol' => '¥',
            'code' => 'CNY',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'INR' => [
            'name' => 'Indian Rupee',
            'symbol' => '₹',
            'code' => 'INR',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'AED' => [
            'name' => 'UAE Dirham',
            'symbol' => 'د.إ',
            'code' => 'AED',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
        'SAR' => [
            'name' => 'Saudi Riyal',
            'symbol' => '﷼',
            'code' => 'SAR',
            'decimal_places' => 2,
            'decimal_separator' => '.',
            'thousands_separator' => ',',
            'symbol_position' => 'before',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Country to Currency Mapping
    |--------------------------------------------------------------------------
    |
    | Maps countries to their default currencies. This is used to automatically
    | determine the currency based on the visitor's detected country.
    |
    */
    'country_currency_map' => [
        'KE' => 'KES', // Kenya
        'UG' => 'UGX', // Uganda
        'TZ' => 'TZS', // Tanzania
        'GB' => 'GBP', // United Kingdom
        'DE' => 'EUR', // Germany
        'FR' => 'EUR', // France
        'IT' => 'EUR', // Italy
        'ES' => 'EUR', // Spain
        'NL' => 'EUR', // Netherlands
        'BE' => 'EUR', // Belgium
        'AT' => 'EUR', // Austria
        'IE' => 'EUR', // Ireland
        'PT' => 'EUR', // Portugal
        'GR' => 'EUR', // Greece
        'FI' => 'EUR', // Finland
        'LU' => 'EUR', // Luxembourg
        'ZA' => 'ZAR', // South Africa
        'NG' => 'NGN', // Nigeria
        'GH' => 'GHS', // Ghana
        'EG' => 'EGP', // Egypt
        'RW' => 'RWF', // Rwanda
        'BW' => 'BWP', // Botswana
        'NA' => 'NAD', // Namibia
        'ZM' => 'ZMW', // Zambia
        'MZ' => 'MZN', // Mozambique
        'AO' => 'AOA', // Angola
        'CM' => 'XAF', // Cameroon
        'SN' => 'XOF', // Senegal
        'CI' => 'XOF', // Ivory Coast
        'ML' => 'XOF', // Mali
        'BF' => 'XOF', // Burkina Faso
        'NE' => 'XOF', // Niger
        'CA' => 'CAD', // Canada
        'AU' => 'AUD', // Australia
        'JP' => 'JPY', // Japan
        'CN' => 'CNY', // China
        'IN' => 'INR', // India
        'AE' => 'AED', // United Arab Emirates
        'SA' => 'SAR', // Saudi Arabia
        'US' => 'USD', // United States
    ],

    /*
    |--------------------------------------------------------------------------
    | Exchange Rate Provider
    |--------------------------------------------------------------------------
    |
    | The service to use for fetching exchange rates. Options:
    | - 'fixer' (requires API key)
    | - 'exchangerate_api' (free tier available)
    | - 'openexchangerates' (requires API key)
    | - 'mock' (for testing, returns 1:1 rates)
    |
    */
    'exchange_rate_provider' => env('EXCHANGE_RATE_PROVIDER', 'exchangerate_api'),

    /*
    |--------------------------------------------------------------------------
    | API Keys
    |--------------------------------------------------------------------------
    |
    | API keys for exchange rate services if required.
    |
    */
    'api_keys' => [
        'fixer' => env('FIXER_API_KEY'),
        'openexchangerates' => env('OPENEXCHANGERATES_API_KEY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Cache Settings
    |--------------------------------------------------------------------------
    |
    | Cache settings for exchange rates to avoid excessive API calls.
    |
    */
    'cache' => [
        'enabled' => true,
        'ttl' => 86400, // 24 hours in seconds
        'key' => 'exchange_rates',
    ],

    /*
    |--------------------------------------------------------------------------
    | Session Keys
    |--------------------------------------------------------------------------
    |
    | Session keys for storing user's currency information.
    |
    */
    'session' => [
        'country' => 'user_country',
        'currency' => 'user_currency',
        'currency_symbol' => 'user_currency_symbol',
        'exchange_rate' => 'user_exchange_rate',
    ],

    /*
    |--------------------------------------------------------------------------
    | Fallback Currency
    |--------------------------------------------------------------------------
    |
    | Fallback currency if detection fails or currency is not supported.
    |
    */
    'fallback' => 'USD',
];
