<?php

namespace Database\Seeders;

use App\Models\BodyType;
use App\Models\Branch;
use App\Models\Color;
use App\Models\DriveType;
use App\Models\EngineType;
use App\Models\FuelType;
use App\Models\InteriorColor;
use App\Models\InventoryStatus;
use App\Models\Make;
use App\Models\Model;
use App\Models\TransmissionType;
use App\Models\Vehicle;
use App\Models\VehicleCategory;
use App\Models\VehicleCondition;
use App\Models\VehicleStatus;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        // Disable cache during seeding to avoid tagging issues
        config(['cache.default' => 'array']);

        // Get required related models
        $makes = Make::active()->get();
        $bodyTypes = BodyType::all();
        $fuelTypes = FuelType::all();
        $transmissionTypes = TransmissionType::all();
        $driveTypes = DriveType::all();
        $engineTypes = EngineType::all();
        $colors = Color::all();
        $interiorColors = InteriorColor::all();
        $vehicleConditions = VehicleCondition::all();
        $vehicleStatuses = VehicleStatus::all();
        $inventoryStatuses = InventoryStatus::all();
        $vehicleCategories = VehicleCategory::all();
        $branches = Branch::all();

        if ($branches->isEmpty()) {
            $this->command->warn('No branches found. Please seed branches first.');

            return;
        }

        // Sample vehicle data with realistic combinations
        $vehicleData = [
            // Toyota vehicles
            [
                'make' => 'Toyota',
                'model' => 'Camry',
                'year' => 2024,
                'trim' => 'XSE',
                'price' => 32990,
                'mileage' => 15,
                'condition' => 'New',
                'body_type' => 'Sedan',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'Front-Wheel Drive',
                'color' => 'Celestial Silver Metallic',
                'interior_color' => 'Black',
                'description' => '2024 Toyota Camry XSE featuring a 2.5L 4-cylinder engine, 8-speed automatic transmission, premium audio system, navigation, leather interior, and advanced safety features.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'RAV4',
                'year' => 2024,
                'trim' => 'Limited',
                'price' => 38450,
                'mileage' => 22,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Blueprint',
                'interior_color' => 'Gray',
                'description' => '2024 Toyota RAV4 Limited Hybrid with excellent fuel economy, panoramic sunroof, premium JBL audio, heated ventilated seats, and Toyota Safety Sense 2.5.',
            ],
            [
                'make' => 'Toyota',
                'model' => 'Tacoma',
                'year' => 2023,
                'trim' => 'TRD Off-Road',
                'price' => 42995,
                'mileage' => 12500,
                'condition' => 'Excellent',
                'body_type' => 'Truck',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'Four-Wheel Drive',
                'color' => 'Army Green',
                'interior_color' => 'Black',
                'description' => '2023 Toyota Tacoma TRD Off-Road with 4WD, locking rear differential, multi-terrain monitor, bed liner, and off-road suspension.',
            ],
            // Honda vehicles
            [
                'make' => 'Honda',
                'model' => 'Civic',
                'year' => 2024,
                'trim' => 'Sport Touring',
                'price' => 32100,
                'mileage' => 8,
                'condition' => 'New',
                'body_type' => 'Sedan',
                'fuel_type' => 'Gasoline',
                'transmission' => 'CVT',
                'drive_type' => 'Front-Wheel Drive',
                'color' => 'Crystal Black Pearl',
                'interior_color' => 'Red',
                'description' => '2024 Honda Civic Sport Touring with turbocharged engine, Honda Sensing suite, wireless Apple CarPlay/Android Auto, and premium audio system.',
            ],
            [
                'make' => 'Honda',
                'model' => 'CR-V',
                'year' => 2024,
                'trim' => 'EX-L',
                'price' => 36700,
                'mileage' => 18,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Sonic Gray Pearl',
                'interior_color' => 'Gray',
                'description' => '2024 Honda CR-V EX-L with leather interior, power tailgate, heated front seats, and Honda Sensing safety technology.',
            ],
            // Ford vehicles
            [
                'make' => 'Ford',
                'model' => 'F-150',
                'year' => 2024,
                'trim' => 'Lariat',
                'price' => 58995,
                'mileage' => 12,
                'condition' => 'New',
                'body_type' => 'Truck',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'Four-Wheel Drive',
                'color' => 'Agate Black Metallic',
                'interior_color' => 'Tan',
                'description' => '2024 Ford F-150 Lariat with 3.5L EcoBoost V6, leather interior, SYNC 4 touchscreen, panoramic roof, and Pro Trailer Backup Assist.',
            ],
            [
                'make' => 'Ford',
                'model' => 'Mustang',
                'year' => 2024,
                'trim' => 'GT Premium',
                'price' => 55990,
                'mileage' => 5,
                'condition' => 'New',
                'body_type' => 'Coupe',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Manual',
                'drive_type' => 'Rear-Wheel Drive',
                'color' => 'Velocity Blue',
                'interior_color' => 'Black',
                'description' => '2024 Ford Mustang GT Premium with 5.0L V8 engine, 6-speed manual transmission, Brembo brakes, and performance package.',
            ],
            // BMW vehicles
            [
                'make' => 'BMW',
                'model' => '3 Series',
                'year' => 2024,
                'trim' => '330i xDrive',
                'price' => 47900,
                'mileage' => 20,
                'condition' => 'New',
                'body_type' => 'Sedan',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Alpine White',
                'interior_color' => 'Black',
                'description' => '2024 BMW 330i xDrive with 2.0L turbo engine, iDrive 8.0 system, Live Cockpit Pro, and BMW Driving Assistant.',
            ],
            [
                'make' => 'BMW',
                'model' => 'X5',
                'year' => 2023,
                'trim' => 'xDrive40i',
                'price' => 68500,
                'mileage' => 8500,
                'condition' => 'Excellent',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Phytonic Blue',
                'interior_color' => 'Cognac',
                'description' => '2023 BMW X5 xDrive40i with 3.0L inline-6 turbo, panoramic sky lounge LED roof, executive package, and M Sport brakes.',
            ],
            // Mercedes-Benz vehicles
            [
                'make' => 'Mercedes-Benz',
                'model' => 'C-Class',
                'year' => 2024,
                'trim' => 'C300 4MATIC',
                'price' => 47550,
                'mileage' => 15,
                'condition' => 'New',
                'body_type' => 'Sedan',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Polar White',
                'interior_color' => 'Black',
                'description' => '2024 Mercedes-Benz C300 4MATIC with 2.0L turbo engine, MBUX infotainment, Burmester audio, and PRE-SAFE safety system.',
            ],
            [
                'make' => 'Mercedes-Benz',
                'model' => 'GLE',
                'year' => 2023,
                'trim' => 'GLE 450',
                'price' => 72900,
                'mileage' => 12000,
                'condition' => 'Excellent',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Selenite Grey Metallic',
                'interior_color' => 'Espresso Brown',
                'description' => '2023 Mercedes-Benz GLE 450 with 3.0L inline-6 turbo, E-ACTIVE BODY CONTROL, air suspension, and premium interior.',
            ],
            // Tesla vehicles
            [
                'make' => 'Tesla',
                'model' => 'Model Y',
                'year' => 2024,
                'trim' => 'Long Range AWD',
                'price' => 52490,
                'mileage' => 0,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Electric',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Pearl White',
                'interior_color' => 'Black',
                'description' => '2024 Tesla Model Y Long Range AWD with 330-mile range, Autopilot, premium interior, 15-inch touchscreen, and full self-driving capability.',
            ],
            [
                'make' => 'Tesla',
                'model' => 'Model 3',
                'year' => 2024,
                'trim' => 'Performance',
                'price' => 54990,
                'mileage' => 5,
                'condition' => 'New',
                'body_type' => 'Sedan',
                'fuel_type' => 'Electric',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Midnight Silver Metallic',
                'interior_color' => 'White',
                'description' => '2024 Tesla Model 3 Performance with 315-mile range, 3.1s 0-60 mph, Track Mode, upgraded brakes, and carbon fiber spoiler.',
            ],
            // Audi vehicles
            [
                'make' => 'Audi',
                'model' => 'Q5',
                'year' => 2024,
                'trim' => 'Premium Plus',
                'price' => 52195,
                'mileage' => 18,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Navarra Blue Metallic',
                'interior_color' => 'Black',
                'description' => '2024 Audi Q5 Premium Plus with 2.0L turbo, MMI touch response, Bang & Olufsen audio, and virtual cockpit plus.',
            ],
            // Porsche vehicles
            [
                'make' => 'Porsche',
                'model' => '911',
                'year' => 2023,
                'trim' => 'Carrera S',
                'price' => 125000,
                'mileage' => 4500,
                'condition' => 'Excellent',
                'body_type' => 'Coupe',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'Rear-Wheel Drive',
                'color' => 'Guards Red',
                'interior_color' => 'Black',
                'description' => '2023 Porsche 911 Carrera S with 3.0L twin-turbo flat-6, 8-speed PDK, Sport Chrono package, and premium interior.',
            ],
            // Jeep vehicles
            [
                'make' => 'Jeep',
                'model' => 'Wrangler',
                'year' => 2024,
                'trim' => 'Rubicon',
                'price' => 47995,
                'mileage' => 10,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Manual',
                'drive_type' => 'Four-Wheel Drive',
                'color' => 'Sarge Green',
                'interior_color' => 'Black',
                'description' => '2024 Jeep Wrangler Rubicon with 4.0L V6, manual transmission, rock rails, locking differentials, and removable roof.',
            ],
            // Hyundai vehicles
            [
                'make' => 'Hyundai',
                'model' => 'Tucson',
                'year' => 2024,
                'trim' => 'Limited',
                'price' => 36850,
                'mileage' => 25,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Ceres White',
                'interior_color' => 'Gray',
                'description' => '2024 Hyundai Tucson Limited Hybrid with HTRAC AWD, panoramic sunroof, leather interior, and Hyundai Digital Key.',
            ],
            // Kia vehicles
            [
                'make' => 'Kia',
                'model' => 'Telluride',
                'year' => 2024,
                'trim' => 'SX Prestige',
                'price' => 53190,
                'mileage' => 15,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Snow White Pearl',
                'interior_color' => 'Dark Moss',
                'description' => '2024 Kia Telluride SX Prestige with VIP seating, Nappa leather, head-up display, and premium Harman Kardon audio.',
            ],
            // Chevrolet vehicles
            [
                'make' => 'Chevrolet',
                'model' => 'Corvette',
                'year' => 2024,
                'trim' => 'Stingray',
                'price' => 78995,
                'mileage' => 8,
                'condition' => 'New',
                'body_type' => 'Coupe',
                'fuel_type' => 'Gasoline',
                'transmission' => 'Automatic',
                'drive_type' => 'Rear-Wheel Drive',
                'color' => 'Torch Red',
                'interior_color' => 'Black',
                'description' => '2024 Chevrolet Corvette Stingray with 6.2L V8, 8-speed dual-clutch, performance exhaust, and carbon fiber ground effects.',
            ],
            // Lexus vehicles
            [
                'make' => 'Lexus',
                'model' => 'RX',
                'year' => 2024,
                'trim' => 'RX 450h+',
                'price' => 58650,
                'mileage' => 12,
                'condition' => 'New',
                'body_type' => 'SUV',
                'fuel_type' => 'Hybrid',
                'transmission' => 'Automatic',
                'drive_type' => 'All-Wheel Drive',
                'color' => 'Nebula Gray Pearl',
                'interior_color' => 'Circuit Red',
                'description' => '2024 Lexus RX 450h+ plug-in hybrid with Mark Levinson audio, panoramic roof, and Lexus Safety System+ 3.0.',
            ],
        ];

        foreach ($vehicleData as $data) {
            $make = $makes->where('name', $data['make'])->first();
            $model = $make ? Model::where('make_id', $make->id)->where('name', $data['model'])->first() : null;

            if (! $make || ! $model) {
                $this->command->warn("Skipping vehicle: Make or Model not found for {$data['make']} {$data['model']}");

                continue;
            }

            $bodyType = $bodyTypes->where('name', $data['body_type'])->first();
            $fuelType = $fuelTypes->where('name', $data['fuel_type'])->first();
            $transmissionType = $transmissionTypes->where('name', $data['transmission'])->first();
            $driveType = $driveTypes->where('name', $data['drive_type'])->first();
            $color = $colors->where('name', $data['color'])->first() ?? $colors->random();
            $interiorColor = $interiorColors->where('name', $data['interior_color'])->first() ?? $interiorColors->random();
            $vehicleCondition = $vehicleConditions->where('name', $data['condition'])->first();
            $vehicleStatus = $vehicleStatuses->where('slug', 'published')->first();
            $inventoryStatus = $inventoryStatuses->where('slug', 'available')->first();
            $vehicleCategory = $vehicleCategories->first();
            $branch = $branches->random();

            if (! $bodyType || ! $fuelType || ! $transmissionType || ! $driveType || ! $vehicleCondition || ! $vehicleStatus || ! $inventoryStatus) {
                $this->command->warn("Skipping vehicle: Missing required related data for {$data['make']} {$data['model']}");
                $this->command->warn('BodyType: '.($bodyType ? $bodyType->name : 'MISSING'));
                $this->command->warn('FuelType: '.($fuelType ? $fuelType->name : 'MISSING'));
                $this->command->warn('TransmissionType: '.($transmissionType ? $transmissionType->name : 'MISSING'));
                $this->command->warn('DriveType: '.($driveType ? $driveType->name : 'MISSING'));
                $this->command->warn('VehicleCondition: '.($vehicleCondition ? $vehicleCondition->name : 'MISSING'));
                $this->command->warn('VehicleStatus: '.($vehicleStatus ? $vehicleStatus->name : 'MISSING'));
                $this->command->warn('InventoryStatus: '.($inventoryStatus ? $inventoryStatus->name : 'MISSING'));

                continue;
            }

            Vehicle::create([
                'branch_id' => $branch->id,
                'vehicle_category_id' => $vehicleCategory->id,
                'make_id' => $make->id,
                'model_id' => $model->id,
                'body_type_id' => $bodyType->id,
                'fuel_type_id' => $fuelType->id,
                'transmission_type_id' => $transmissionType->id,
                'drive_type_id' => $driveType->id,
                'color_id' => $color->id,
                'interior_color_id' => $interiorColor->id,
                'vehicle_condition_id' => $vehicleCondition->id,
                'vehicle_status_id' => $vehicleStatus->id,
                'inventory_status_id' => $inventoryStatus->id,
                'stock_number' => strtoupper(substr($make->code, 0, 3)).'-'.rand(10000, 99999),
                'vin' => $this->generateVin(),
                'year' => $data['year'],
                'title' => "{$data['year']} {$data['make']} {$data['model']} {$data['trim']}",
                'slug' => Str::slug("{$data['year']}-{$data['make']}-{$data['model']}-{$data['trim']}-".rand(1000, 9999)),
                'mileage' => $data['mileage'],
                'cost_price' => $data['price'] * 0.85,
                'sale_price' => $data['price'],
                'msrp' => $data['price'] * 1.1,
                'is_featured' => rand(0, 1) === 1,
                'is_certified' => $data['condition'] === 'Used' && rand(0, 1) === 1,
                'acquired_at' => now()->subDays(rand(1, 90)),
                'listed_at' => now()->subDays(rand(1, 30)),
                'description' => $data['description'],
                'metadata' => [
                    'trim_level' => $data['trim'],
                    'engine_size' => $this->getEngineSize($data['make'], $data['model']),
                    'horsepower' => $this->getHorsepower($data['make'], $data['model']),
                    'fuel_economy_city' => rand(18, 35),
                    'fuel_economy_highway' => rand(25, 45),
                    'seating_capacity' => rand(4, 7),
                    'cargo_capacity' => rand(15, 100).' cu ft',
                ],
            ]);
        }

        $this->command->info('Vehicle seeder completed successfully.');
    }

    private function generateVin(): string
    {
        $characters = '0123456789ABCDEFGHJKLMNPRSTUVWXYZ';
        $vin = '';
        for ($i = 0; $i < 17; $i++) {
            $vin .= $characters[rand(0, strlen($characters) - 1)];
        }

        return $vin;
    }

    private function getEngineSize(string $make, string $model): string
    {
        $engines = [
            'Toyota' => '2.5L 4-Cylinder',
            'Honda' => '2.0L 4-Cylinder Turbo',
            'Ford' => '3.5L V6 EcoBoost',
            'BMW' => '2.0L 4-Cylinder Turbo',
            'Mercedes-Benz' => '2.0L 4-Cylinder Turbo',
            'Tesla' => 'Electric Motor',
            'Audi' => '2.0L 4-Cylinder Turbo',
            'Porsche' => '3.0L Twin-Turbo Flat-6',
            'Jeep' => '3.6L V6',
            'Hyundai' => '1.6L 4-Cylinder Turbo',
            'Kia' => '3.8L V6',
            'Chevrolet' => '6.2L V8',
            'Lexus' => '2.5L 4-Cylinder Hybrid',
        ];

        return $engines[$make] ?? '2.0L 4-Cylinder';
    }

    private function getHorsepower(string $make, string $model): int
    {
        $horsepower = [
            'Toyota' => 203,
            'Honda' => 200,
            'Ford' => 400,
            'BMW' => 255,
            'Mercedes-Benz' => 255,
            'Tesla' => 450,
            'Audi' => 201,
            'Porsche' => 443,
            'Jeep' => 285,
            'Hyundai' => 226,
            'Kia' => 291,
            'Chevrolet' => 495,
            'Lexus' => 304,
        ];

        return $horsepower[$make] ?? 200;
    }
}
