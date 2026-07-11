<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Services\Currency\CurrencyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CurrencyController extends Controller
{
    public function __construct(private readonly CurrencyService $currencyService) {}

    /**
     * Set the user's currency preference.
     */
    public function setCurrency(Request $request): RedirectResponse
    {
        $currency = $request->input('currency');

        if ($currency && $this->currencyService->isCurrencySupported($currency)) {
            $this->currencyService->setCurrency($currency);
        }

        return back()->with('success', 'Currency updated successfully.');
    }

    /**
     * Get currency information (for API use).
     */
    public function getInfo(): Response
    {
        return Inertia::render('Currency/Info', [
            'currency' => $this->currencyService->getCurrentCurrency(),
            'currencySymbol' => $this->currencyService->getCurrentSymbol(),
            'exchangeRate' => $this->currencyService->getCurrentExchangeRate(),
            'country' => $this->currencyService->getCountry(),
            'supportedCurrencies' => $this->currencyService->getSupportedCurrencies(),
        ]);
    }

    /**
     * Convert an amount (for API use).
     */
    public function convert(Request $request): array
    {
        $amount = (float) $request->input('amount', 0);
        $from = $request->input('from', 'USD');
        $to = $request->input('to', $this->currencyService->getCurrentCurrency());

        $convertedAmount = $this->currencyService->convert($amount, $from, $to);
        $formattedAmount = $this->currencyService->format($amount, $to);

        return [
            'amount' => $amount,
            'from' => $from,
            'to' => $to,
            'converted_amount' => $convertedAmount,
            'formatted_amount' => $formattedAmount,
            'exchange_rate' => $this->currencyService->getExchangeRate($from, $to),
        ];
    }
}
