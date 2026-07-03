<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Inertia\Inertia;
use Inertia\Response;

class FaqController extends Controller
{
    public function index(): Response
    {
        $faqs = Faq::active()
            ->orderBy('sort_order')
            ->get()
            ->map(fn ($faq) => [
                'id' => (string) $faq->id,
                'question' => $faq->question,
                'answer' => $faq->answer,
                'category' => $faq->category,
            ]);

        return Inertia::render('public/faq', [
            'faqs' => $faqs,
        ]);
    }
}
