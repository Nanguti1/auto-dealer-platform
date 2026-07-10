<?php

namespace Database\Seeders;

use App\Models\Make;
use Illuminate\Database\Seeder;

class MakeSeeder extends Seeder
{
    public function run(): void
    {
        $makes = [
            ['name' => 'Toyota', 'slug' => 'toyota', 'code' => 'TOY', 'is_active' => true, 'sort_order' => 1],
            ['name' => 'Honda', 'slug' => 'honda', 'code' => 'HON', 'is_active' => true, 'sort_order' => 2],
            ['name' => 'Ford', 'slug' => 'ford', 'code' => 'FOR', 'is_active' => true, 'sort_order' => 3],
            ['name' => 'Chevrolet', 'slug' => 'chevrolet', 'code' => 'CHE', 'is_active' => true, 'sort_order' => 4],
            ['name' => 'BMW', 'slug' => 'bmw', 'code' => 'BMW', 'is_active' => true, 'sort_order' => 5],
            ['name' => 'Mercedes-Benz', 'slug' => 'mercedes-benz', 'code' => 'MBZ', 'is_active' => true, 'sort_order' => 6],
            ['name' => 'Audi', 'slug' => 'audi', 'code' => 'AUD', 'is_active' => true, 'sort_order' => 7],
            ['name' => 'Volkswagen', 'slug' => 'volkswagen', 'code' => 'VW', 'is_active' => true, 'sort_order' => 8],
            ['name' => 'Nissan', 'slug' => 'nissan', 'code' => 'NIS', 'is_active' => true, 'sort_order' => 9],
            ['name' => 'Hyundai', 'slug' => 'hyundai', 'code' => 'HYU', 'is_active' => true, 'sort_order' => 10],
            ['name' => 'Kia', 'slug' => 'kia', 'code' => 'KIA', 'is_active' => true, 'sort_order' => 11],
            ['name' => 'Subaru', 'slug' => 'subaru', 'code' => 'SUB', 'is_active' => true, 'sort_order' => 12],
            ['name' => 'Mazda', 'slug' => 'mazda', 'code' => 'MAZ', 'is_active' => true, 'sort_order' => 13],
            ['name' => 'Lexus', 'slug' => 'lexus', 'code' => 'LEX', 'is_active' => true, 'sort_order' => 14],
            ['name' => 'Tesla', 'slug' => 'tesla', 'code' => 'TSL', 'is_active' => true, 'sort_order' => 15],
            ['name' => 'Porsche', 'slug' => 'porsche', 'code' => 'POR', 'is_active' => true, 'sort_order' => 16],
            ['name' => 'Jeep', 'slug' => 'jeep', 'code' => 'JEEP', 'is_active' => true, 'sort_order' => 17],
            ['name' => 'Ram', 'slug' => 'ram', 'code' => 'RAM', 'is_active' => true, 'sort_order' => 18],
            ['name' => 'Cadillac', 'slug' => 'cadillac', 'code' => 'CAD', 'is_active' => true, 'sort_order' => 19],
            ['name' => 'Volvo', 'slug' => 'volvo', 'code' => 'VOL', 'is_active' => true, 'sort_order' => 20],
        ];

        foreach ($makes as $make) {
            Make::firstOrCreate(
                ['slug' => $make['slug']],
                $make
            );
        }
    }
}
