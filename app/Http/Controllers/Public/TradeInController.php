<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\LeadCreated;
use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\TradeInRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TradeInController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('trade-in/request');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:'.(date('Y') + 1),
            'mileage' => 'nullable|integer|min:0',
            'vin' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        // Split name into first and last name
        $nameParts = explode(' ', trim($validated['name']), 2);
        $firstName = $nameParts[0] ?? '';
        $lastName = $nameParts[1] ?? '';

        // Create a lead for the trade-in request
        $lead = Lead::create([
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => $validated['email'],
            'source' => 'trade-in',
            'status' => 'new',
        ]);

        // Create a trade-in request with vehicle details
        $tradeIn = new TradeInRequest([
            'make' => $validated['make'],
            'model' => $validated['model'],
            'year' => $validated['year'],
            'mileage' => $validated['mileage'] ?? null,
            'vin' => $validated['vin'] ?? null,
            'status' => 'submitted',
        ]);

        // Set condition report separately to avoid array validation issues
        $tradeIn->condition_report = [
            'notes' => $validated['notes'] ?? null,
        ];

        $tradeIn->save();

        event(new LeadCreated($lead));

        return back()->with('success', 'Your trade-in request has been submitted. We will contact you shortly.');
    }
}
