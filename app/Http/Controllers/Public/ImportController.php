<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\VehicleImport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ImportController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('import/request');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_description' => 'required|string|max:255',
            'origin_country' => 'required|string|max:255',
            'budget' => 'nullable|numeric|min:0',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'notes' => 'nullable|string',
        ]);

        // Create an import request
        $import = VehicleImport::create([
            'customer_name' => $validated['name'],
            'customer_email' => $validated['email'],
            'vehicle_description' => $validated['vehicle_description'],
            'origin_country' => $validated['origin_country'],
            'budget' => $validated['budget'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        // Also create a lead for CRM tracking
        Lead::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'source' => 'import',
            'status' => 'new',
            'notes' => json_encode([
                'import_id' => $import->id,
                'vehicle_description' => $validated['vehicle_description'],
                'origin_country' => $validated['origin_country'],
                'budget' => $validated['budget'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]),
        ]);

        return back()->with('success', 'Your import request has been received. Our team will be in touch.');
    }
}
