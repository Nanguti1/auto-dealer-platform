<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\LeadCreated;
use App\Http\Controllers\Controller;
use App\Models\Lead;
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

        // Create a lead for the trade-in request
        $lead = Lead::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $request->input('phone'),
            'source' => 'trade-in',
            'status' => 'new',
            'notes' => json_encode([
                'make' => $validated['make'],
                'model' => $validated['model'],
                'year' => $validated['year'],
                'mileage' => $validated['mileage'] ?? null,
                'vin' => $validated['vin'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]),
        ]);

        event(new LeadCreated($lead));

        return back()->with('success', 'Your trade-in request has been submitted. We will contact you shortly.');
    }
}
