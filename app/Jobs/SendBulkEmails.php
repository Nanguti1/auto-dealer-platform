<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class SendBulkEmails implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $timeout = 300;

    public function __construct(
        public readonly string $mailableClass,
        public readonly array $userIds,
        public readonly array $data = []
    ) {}

    public function handle(): void
    {
        try {
            $users = User::whereIn('id', $this->userIds)->get();

            if ($users->isEmpty()) {
                Log::warning('No users found for bulk email: '.json_encode($this->userIds));

                return;
            }

            $sentCount = 0;
            $failedCount = 0;

            foreach ($users as $user) {
                try {
                    if (class_exists($this->mailableClass)) {
                        Mail::to($user->email)->send(new $this->mailableClass($this->data, $user));
                        $sentCount++;
                    } else {
                        Log::error("Mailable class not found: {$this->mailableClass}");
                        $failedCount++;
                    }
                } catch (\Exception $e) {
                    Log::error("Failed to send email to user {$user->id}: {$e->getMessage()}");
                    $failedCount++;
                }
            }

            Log::info("Bulk email completed: {$sentCount} sent, {$failedCount} failed");
        } catch (\Exception $e) {
            Log::error("Bulk email job failed: {$e->getMessage()}");
            $this->release(60);
        }
    }
}
