<?php

declare(strict_types=1);

namespace App\Notifications;

use App\Models\ImportShipment;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ImportShipmentArrived extends Notification implements ShouldQueue
{
    public function __construct(public ImportShipment $shipment) {}

    /** @return array<int, string> */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Import Shipment Arrived')
            ->greeting('Shipment arrival notification')
            ->line("Import shipment #{$this->shipment->id} has arrived.")
            ->line("Tracking Number: {$this->shipment->tracking_number}")
            ->line("Origin: {$this->shipment->origin}")
            ->line("Status: {$this->shipment->status}")
            ->line("Vehicle Count: {$this->shipment->vehicles()->count()}")
            ->action('View Shipment', route('admin.imports.shipments.show', $this->shipment->id))
            ->line('Please inspect the shipment and update inventory.');
    }

    /** @return array<string, mixed> */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Import Shipment Arrived',
            'message' => "Shipment #{$this->shipment->id} has arrived.",
            'shipment_id' => $this->shipment->id,
            'tracking_number' => $this->shipment->tracking_number,
            'status' => $this->shipment->status,
            'action_url' => route('admin.imports.shipments.show', $this->shipment->id),
        ];
    }
}
