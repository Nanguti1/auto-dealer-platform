<?php

namespace Database\Factories;

use App\Models\Role;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->word(),
            'display_name' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'is_system' => false,
        ];
    }

    /**
     * Indicate that the role is admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'admin',
            'display_name' => 'Administrator',
            'description' => 'Full system access',
            'is_system' => true,
        ]);
    }

    /**
     * Indicate that the role is manager.
     */
    public function manager(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'manager',
            'display_name' => 'Manager',
            'description' => 'Manager with limited access',
            'is_system' => true,
        ]);
    }

    /**
     * Indicate that the role is staff.
     */
    public function staff(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'staff',
            'display_name' => 'Staff',
            'description' => 'Staff member with basic access',
            'is_system' => true,
        ]);
    }

    /**
     * Indicate that the role is customer.
     */
    public function customer(): static
    {
        return $this->state(fn (array $attributes) => [
            'name' => 'customer',
            'display_name' => 'Customer',
            'description' => 'Customer with limited access',
            'is_system' => true,
        ]);
    }
}
