<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Models\AuditLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RecordAuditLog implements ShouldQueue
{
    public int $tries = 3;

    public function handle(object $event): void
    {
        try {
            $user = Auth::user();
            $eventClass = get_class($event);

            // Extract auditable model from event
            $auditable = null;
            $oldValues = null;
            $newValues = null;

            // Check if event has a public readonly property that's a model
            $reflection = new \ReflectionClass($event);
            $properties = $reflection->getProperties(\ReflectionProperty::IS_PUBLIC);

            foreach ($properties as $property) {
                if (! $property->isReadOnly()) {
                    continue;
                }

                $value = $property->getValue($event);
                if ($value instanceof Model) {
                    $auditable = $value;
                    break;
                }
            }

            // Determine old and new values based on event type
            if ($auditable) {
                $eventName = class_basename($eventClass);

                if (str_ends_with($eventName, 'Created')) {
                    $newValues = $this->getModelAttributes($auditable);
                } elseif (str_ends_with($eventName, 'Updated')) {
                    $newValues = $this->getModelAttributes($auditable);
                    // Check if event has oldValues property
                    if (property_exists($event, 'oldValues') && ! empty($event->oldValues)) {
                        $oldValues = $this->filterSensitiveData($event->oldValues);
                    }
                } elseif (str_ends_with($eventName, 'Deleted')) {
                    $oldValues = $this->getModelAttributes($auditable);
                } elseif (str_ends_with($eventName, 'Approved') || str_ends_with($eventName, 'Rejected')) {
                    $newValues = $this->getModelAttributes($auditable);
                }
            }

            // Create audit log entry
            $auditLog = AuditLog::create([
                'user_id' => $user?->id,
                'auditable_type' => $auditable ? get_class($auditable) : null,
                'auditable_id' => $auditable?->id,
                'event' => $eventClass,
                'old_values' => $oldValues,
                'new_values' => $newValues ?: null,
                'ip_address' => request()->ip(),
                'user_agent' => request()->userAgent(),
            ]);

            Log::info('Audit log recorded', [
                'audit_log_id' => $auditLog->id,
                'event' => $eventClass,
                'user_id' => $user?->id,
            ]);
        } catch (\Exception $e) {
            Log::error("Failed to record audit log: {$e->getMessage()}", [
                'exception' => $e,
                'event' => get_class($event),
            ]);
            $this->release(30);
        }
    }

    /**
     * Get model attributes for audit logging, excluding sensitive data
     */
    protected function getModelAttributes(Model $model): array
    {
        $attributes = $model->toArray();

        return $this->filterSensitiveData($attributes);
    }

    /**
     * Filter sensitive data from attributes array
     */
    protected function filterSensitiveData(array $attributes): array
    {
        // Remove sensitive attributes
        $sensitiveKeys = ['password', 'token', 'secret', 'api_key', 'credit_card'];
        foreach ($sensitiveKeys as $key) {
            unset($attributes[$key]);
        }

        // Remove large attributes that could cause storage issues
        unset($attributes['remember_token']);

        return $attributes;
    }
}
