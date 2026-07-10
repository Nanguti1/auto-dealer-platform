<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::firstOrCreate(
            ['slug' => 'default'],
            [
                'name' => 'Default Dealership',
                'slug' => 'default',
                'email' => 'info@dealership.co.ke',
                'phone' => '+254 700 000 000',
                'is_active' => true,
            ]
        );
    }
}
