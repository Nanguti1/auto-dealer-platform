<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Reservations;

use App\Http\Controllers\Controller;
use App\Http\Requests\Reservations\StoreReservationRequest;
use App\Http\Requests\Reservations\UpdateReservationRequest;
use App\Models\Customer;
use App\Models\User;
use App\Models\Vehicle;
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

        return Inertia::render('Admin/Reservations/Create', [
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->whereHas('inventoryStatus', fn ($query) => $query->where('slug', 'available'))
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                ]),
            'customers' => Customer::select('id', 'first_name', 'last_name', 'email', 'customer_number')
                ->get()
                ->map(fn ($customer) => [
                    'id' => $customer->id,
                    'name' => "{$customer->first_name} {$customer->last_name}",
                    'email' => $customer->email,
                    'customer_number' => $customer->customer_number,
                ]),
            'users' => User::select('id', 'name', 'email')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]),
        ]);
    }

    public function store(StoreReservationRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.reservations.index')->with('success', 'Created successfully.');
    }

    public function show(VehicleReservation $reservation): Response
    {
        $this->authorize('view', $reservation);

        $reservation->load(['vehicle.make', 'vehicle.vehicleModel', 'customer', 'user']);

        return Inertia::render('Admin/Reservations/Show', [
            'reservation' => $reservation,
        ]);
    }

    public function edit(VehicleReservation $reservation): Response
    {
        $this->authorize('update', $reservation);

        $reservation->load(['vehicle.make', 'vehicle.vehicleModel', 'customer', 'user']);

        return Inertia::render('Admin/Reservations/Edit', [
            'reservation' => $reservation,
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                ]),
            'customers' => Customer::select('id', 'first_name', 'last_name', 'email', 'customer_number')
                ->get()
                ->map(fn ($customer) => [
                    'id' => $customer->id,
                    'name' => "{$customer->first_name} {$customer->last_name}",
                    'email' => $customer->email,
                    'customer_number' => $customer->customer_number,
                ]),
            'users' => User::select('id', 'name', 'email')
                ->get()
                ->map(fn ($user) => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ]),
        ]);
    }

    public function update(UpdateReservationRequest $request, VehicleReservation $reservation): RedirectResponse
    {
        $this->service->update($reservation, $request->validated());

        return redirect()->route('admin.reservations.show', $reservation)->with('success', 'Updated successfully.');
    }

    public function destroy(VehicleReservation $reservation): RedirectResponse
    {
        $this->authorize('delete', $reservation);
        $this->service->delete($reservation);

        return redirect()->route('admin.reservations.index')->with('success', 'Deleted successfully.');
    }

    public function confirm(VehicleReservation $reservation): RedirectResponse
    {
        $this->authorize('update', $reservation);
        $reservation->confirm();

        return back()->with('success', 'Reservation confirmed successfully.');
    }

    public function cancel(VehicleReservation $reservation): RedirectResponse
    {
        $this->authorize('update', $reservation);
        $reservation->cancel();

        return back()->with('success', 'Reservation cancelled successfully.');
    }

    public function convertToSale(VehicleReservation $reservation): RedirectResponse
    {
        $this->authorize('update', $reservation);

        $reservation->update(['status' => 'converted']);

        $user = $reservation->customer?->user ?? $reservation->user;
        $reservation->vehicle->markAsSold($user);

        return redirect()->route('admin.invoices.create', [
            'vehicle_id' => $reservation->vehicle_id,
            'customer_id' => $reservation->customer_id,
            'user_id' => $reservation->user_id,
        ])->with('success', 'Reservation converted to sale successfully.');
    }
}
