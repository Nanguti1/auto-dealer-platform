<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Payments;

use App\Http\Controllers\Controller;
use App\Http\Requests\Payments\StorePaymentRequest;
use App\Http\Requests\Payments\UpdatePaymentRequest;
use App\Models\Payment;
use App\Models\User;
use App\Models\Vehicle;
use App\Models\VehicleReservation;
use App\Services\Payments\PaymentService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    public function __construct(private readonly PaymentService $service) {}

    public function index(Request $request): Response
    {
        $this->authorize('viewAny', Payment::class);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $this->service->paginate($request->query()),
            'filters' => $request->query(),
        ]);
    }

    public function create(): Response
    {
        $this->authorize('create', Payment::class);

        return Inertia::render('Admin/Payments/Create', [
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                    'stock_number' => $vehicle->stock_number,
                ]),
            'reservations' => VehicleReservation::with(['vehicle', 'user'])
                ->where('status', 'pending')
                ->get()
                ->map(fn ($reservation) => [
                    'id' => $reservation->id,
                    'vehicle_name' => $reservation->vehicle ? "{$reservation->vehicle->year} {$reservation->vehicle->make->name} {$reservation->vehicle->vehicleModel->name}" : 'Unknown vehicle',
                    'customer_name' => $reservation->user->name ?? $reservation->user->email ?? 'Unknown customer',
                    'deposit_amount' => $reservation->deposit_amount,
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

    public function store(StorePaymentRequest $request): RedirectResponse
    {
        $this->service->create($request->validated());

        return redirect()->route('admin.payments.index')->with('success', 'Created successfully.');
    }

    public function show(Payment $payment): Response
    {
        $this->authorize('view', $payment);

        return Inertia::render('Admin/Payments/Show', [
            'payment' => $payment,
        ]);
    }

    public function edit(Payment $payment): Response
    {
        $this->authorize('update', $payment);

        return Inertia::render('Admin/Payments/Edit', [
            'payment' => $payment,
            'vehicles' => Vehicle::with(['make', 'vehicleModel', 'inventoryStatus'])
                ->get()
                ->map(fn ($vehicle) => [
                    'id' => $vehicle->id,
                    'name' => "{$vehicle->year} {$vehicle->make->name} {$vehicle->vehicleModel->name}",
                    'make' => $vehicle->make->name,
                    'model' => $vehicle->vehicleModel->name,
                    'year' => $vehicle->year,
                    'price' => $vehicle->sale_price,
                    'stock_number' => $vehicle->stock_number,
                ]),
            'reservations' => VehicleReservation::with(['vehicle', 'user'])
                ->where('status', 'pending')
                ->get()
                ->map(fn ($reservation) => [
                    'id' => $reservation->id,
                    'vehicle_name' => $reservation->vehicle ? "{$reservation->vehicle->year} {$reservation->vehicle->make->name} {$reservation->vehicle->vehicleModel->name}" : 'Unknown vehicle',
                    'customer_name' => $reservation->user->name ?? $reservation->user->email ?? 'Unknown customer',
                    'deposit_amount' => $reservation->deposit_amount,
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

    public function update(UpdatePaymentRequest $request, Payment $payment): RedirectResponse
    {
        $this->service->update($payment, $request->validated());

        return back()->with('success', 'Updated successfully.');
    }

    public function destroy(Payment $payment): RedirectResponse
    {
        $this->authorize('delete', $payment);
        $this->service->delete($payment);

        return redirect()->route('admin.payments.index')->with('success', 'Deleted successfully.');
    }

    public function restore(Payment $payment): RedirectResponse
    {
        $this->authorize('restore', $payment);
        $payment->restore();

        return redirect()->route('admin.payments.index')->with('success', 'Restored successfully.');
    }

    public function forceDelete(Payment $payment): RedirectResponse
    {
        $this->authorize('forceDelete', $payment);
        $payment->forceDelete();

        return redirect()->route('admin.payments.index')->with('success', 'Permanently deleted.');
    }
}
