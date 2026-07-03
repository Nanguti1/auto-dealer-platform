<?php

declare(strict_types=1);

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ContactPageController extends Controller
{
    public function index(): Response
    {
        // The Contact page contains mostly static content
        // This could be enhanced with CMS content for address, hours, etc. in the future
        return Inertia::render('public/contact');
    }
}
