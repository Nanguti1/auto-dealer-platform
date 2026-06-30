<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Reservations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservations\StoreReservationRequest;
use App\Http\Requests\Reservations\UpdateReservationRequest;
use App\Models\VehicleReservation;
use App\Services\Reservations\ReservationService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function __construct(private readonly ReservationService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', VehicleReservation::class);

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', VehicleReservation::class);

        return Inertia::render('Admin/Reservations/Create');
    }

    public function store(StoreReservationRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.reservations.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleReservation $vehicleReservation): Response
    {
        $this->authorize('view', $vehicleReservation);

        return Inertia::render('Admin/Reservations/Show', [
            'vehicleReservation' => $vehicleReservation,
        ]);
    }

    public function edit(VehicleReservation $vehicleReservation): Response
    {
        $this->authorize('update', $vehicleReservation);

        return Inertia::render('Admin/Reservations/Edit', [
            'vehicleReservation' => $vehicleReservation,
        ]);
    }

    public function update(UpdateReservationRequest $request, VehicleReservation $vehicleReservation): RedirectResponse
    {
        $this->service->update($vehicleReservation, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleReservation $vehicleReservation): RedirectResponse
    {
        $this->authorize('delete', $vehicleReservation);
        $this->service->delete($vehicleReservation);

        return redirect()->route('admin.reservations.index')->with('success', 'Deleted successfully.');
    }
}
