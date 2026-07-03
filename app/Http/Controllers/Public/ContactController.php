<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Events\LeadCreated;
use App\Http\Controllers\Controller;
use App\Models\Lead;
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

        // Create a lead for the contact request
        $lead = Lead::create([
            'name' => $validated['name'],
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
}
