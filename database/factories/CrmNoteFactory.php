<?php

namespace Database\Factories;

use App\Models\CrmNote;
use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<CrmNote>
 */
class CrmNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lead_id' => Lead::factory(),
            'user_id' => User::factory(),
            'body' => fake()->paragraphs(3, true),
            'is_private' => fake()->boolean(30),
        ];
    }
}
