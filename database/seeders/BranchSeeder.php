<?php

namespace Database\Seeders;

use App\Models\Branch;
use App\Models\Company;
use Illuminate\Database\Seeder;

class BranchSeeder extends Seeder
{
    public function run(): void
    {
        $company = Company::where('slug', 'default')->first();

        if (! $company) {
            $this->command->warn('No company found. Please seed companies first.');

            return;
        }

        $branches = [
            [
                'name' => 'Nairobi',
                'slug' => 'nairobi',
                'code' => 'NBO',
                'address_line_1' => 'Westlands Business District',
                'address_line_2' => 'Nairobi',
                'city' => 'Nairobi',
                'state' => 'Nairobi County',
                'postal_code' => '00100',
                'country' => 'Kenya',
                'phone' => '+254 700 000 001',
                'email' => 'nairobi@dealership.co.ke',
                'is_active' => true,
            ],
            [
                'name' => 'Mombasa',
                'slug' => 'mombasa',
                'code' => 'MBA',
                'address_line_1' => 'Nyali',
                'address_line_2' => 'Mombasa',
                'city' => 'Mombasa',
                'state' => 'Mombasa County',
                'postal_code' => '80100',
                'country' => 'Kenya',
                'phone' => '+254 700 000 002',
                'email' => 'mombasa@dealership.co.ke',
                'is_active' => true,
            ],
            [
                'name' => 'Kisumu',
                'slug' => 'kisumu',
                'code' => 'KSM',
                'address_line_1' => 'Mega City Mall',
                'address_line_2' => 'Kisumu',
                'city' => 'Kisumu',
                'state' => 'Kisumu County',
                'postal_code' => '40100',
                'country' => 'Kenya',
                'phone' => '+254 700 000 003',
                'email' => 'kisumu@dealership.co.ke',
                'is_active' => true,
            ],
            [
                'name' => 'Nakuru',
                'slug' => 'nakuru',
                'code' => 'NKU',
                'address_line_1' => 'Nakuru Central Business District',
                'address_line_2' => 'Nakuru',
                'city' => 'Nakuru',
                'state' => 'Nakuru County',
                'postal_code' => '20100',
                'country' => 'Kenya',
                'phone' => '+254 700 000 004',
                'email' => 'nakuru@dealership.co.ke',
                'is_active' => true,
            ],
        ];

        foreach ($branches as $branch) {
            Branch::firstOrCreate(
                ['slug' => $branch['slug']],
                array_merge($branch, ['company_id' => $company->id])
            );
        }
    }
}
