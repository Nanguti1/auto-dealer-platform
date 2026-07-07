<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            // Reference Data Seeders
            RoleSeeder::class,
            VehicleStatusSeeder::class,
            VehicleConditionSeeder::class,
            InventoryStatusSeeder::class,
            VehicleCategorySeeder::class,
            BodyTypeSeeder::class,
            FuelTypeSeeder::class,
            TransmissionTypeSeeder::class,
            DriveTypeSeeder::class,
            ColorSeeder::class,
            InteriorColorSeeder::class,
            EngineTypeSeeder::class,
            CrmStageSeeder::class,
            // Configuration Seeders
            SettingsSeeder::class,
        ]);
    }
}
