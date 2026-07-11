<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExchangeRate extends Model
{
    protected $fillable = [
        'from_currency',
        'to_currency',
        'rate',
        'fetched_at',
    ];

    protected $casts = [
        'rate' => 'decimal:6',
        'fetched_at' => 'datetime',
    ];

    /**
     * Get the rate for a specific currency pair.
     */
    public static function getRate(string $fromCurrency, string $toCurrency): ?float
    {
        return self::where('from_currency', $fromCurrency)
            ->where('to_currency', $toCurrency)
            ->value('rate');
    }

    /**
     * Update or create an exchange rate.
     */
    public static function updateOrCreateRate(string $fromCurrency, string $toCurrency, float $rate): self
    {
        return self::updateOrCreate(
            [
                'from_currency' => $fromCurrency,
                'to_currency' => $toCurrency,
            ],
            [
                'rate' => $rate,
                'fetched_at' => now(),
            ]
        );
    }
}
