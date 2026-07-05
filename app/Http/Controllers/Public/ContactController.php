<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\LeadCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Public\StorePublicLeadRequest;
use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContactController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('contact/dealer');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $lead = Lead::create([
            'first_name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'source' => 'contact',
            'status' => 'new',
            'notes' => json_encode([
                'subject' => $validated['subject'],
                'message' => $validated['message'],
            ]),
        ]);

        event(new LeadCreated($lead));

        return back()->with('success', 'Message sent successfully.');
    }

    public function storeLead(StorePublicLeadRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $leadData = [
            'vehicle_id' => $validated['vehicle_id'] ?? null,
            'source' => match ($validated['type']) {
                'inquiry' => 'vehicle_inquiry',
                'reservation' => 'vehicle_reservation',
                'test-drive' => 'test_drive',
            },
            'status' => 'new',
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'] ?? '',
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
        ];

        if ($validated['type'] === 'inquiry' && isset($validated['message'])) {
            $leadData['notes'] = $validated['message'];
        }

        if ($validated['type'] === 'test-drive') {
            $leadData['notes'] = json_encode([
                'preferred_date' => $validated['preferred_date'] ?? null,
                'notes' => $validated['notes'] ?? null,
            ]);
        }

        if ($validated['type'] === 'reservation') {
            $leadData['notes'] = json_encode([
                'reservation_request' => true,
                'notes' => $validated['notes'] ?? null,
            ]);
        }

        $lead = Lead::create($leadData);

        event(new LeadCreated($lead));

        return response()->json([
            'success' => true,
            'message' => match ($validated['type']) {
                'inquiry' => 'Your inquiry has been sent successfully.',
                'reservation' => 'Your reservation request has been submitted.',
                'test-drive' => 'Your test drive request has been submitted.',
            },
        ]);
    }
}
