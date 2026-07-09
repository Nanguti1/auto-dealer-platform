<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            ['email' => 'g.nanguti@gmail.com'],
            ['name' => 'Nanguti - SA',
             'password' => Hash::make('password'),
            ]
        );

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

        // Create sample vehicles for the homepage
        \App\Models\Vehicle::factory(10)->listed()->create();
        \App\Models\Vehicle::factory(3)->listed()->featured()->create();
    }
}
