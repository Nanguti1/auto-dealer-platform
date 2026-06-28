<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\StoreSettingRequest;
use App\Http\Requests\Settings\UpdateSettingRequest;
use App\Models\Setting;
use App\Services\Settings\SettingService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function __construct(private readonly SettingService $service)
    {
    }

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Setting::class);

        return Inertia::render('Admin/Settings/Index/Index', [
            'settings' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Setting::class);

        return Inertia::render('Admin/Settings/Index/Create');
    }

    public function store(StoreSettingRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.settings.index')->with('success', 'Created successfully.');
    }

    public function show(Setting $setting): Response
    {
        $this->authorize('view', $setting);

        return Inertia::render('Admin/Settings/Index/Show', [
            'setting' => $setting,
        ]);
    }

    public function edit(Setting $setting): Response
    {
        $this->authorize('update', $setting);

        return Inertia::render('Admin/Settings/Index/Edit', [
            'setting' => $setting,
        ]);
    }

    public function update(UpdateSettingRequest $request, Setting $setting): RedirectResponse
    {
        $this->service->update($setting, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Setting $setting): RedirectResponse
    {
        $this->authorize('delete', $setting);
        $this->service->delete($setting);

        return redirect()->route('admin.settings.index')->with('success', 'Deleted successfully.');
    }
}
