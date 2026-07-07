<?php

namespace Database\Seeders;

use App\Models\CrmStage;
use Illuminate\Database\Seeder;

class CrmStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $stages = [
            [
                'name' => 'New',
                'slug' => 'new',
                'sort_order' => 1,
                'is_won' => false,
                'is_lost' => false,
            ],
            [
                'name' => 'Contacted',
                'slug' => 'contacted',
                'sort_order' => 2,
                'is_won' => false,
                'is_lost' => false,
            ],
            [
                'name' => 'Qualified',
                'slug' => 'qualified',
                'sort_order' => 3,
                'is_won' => false,
                'is_lost' => false,
            ],
            [
                'name' => 'Proposal',
                'slug' => 'proposal',
                'sort_order' => 4,
                'is_won' => false,
                'is_lost' => false,
            ],
            [
                'name' => 'Negotiation',
                'slug' => 'negotiation',
                'sort_order' => 5,
                'is_won' => false,
                'is_lost' => false,
            ],
            [
                'name' => 'Won',
                'slug' => 'won',
                'sort_order' => 6,
                'is_won' => true,
                'is_lost' => false,
            ],
            [
                'name' => 'Lost',
                'slug' => 'lost',
                'sort_order' => 7,
                'is_won' => false,
                'is_lost' => true,
            ],
        ];

        foreach ($stages as $stage) {
            CrmStage::firstOrCreate(
                ['slug' => $stage['slug']],
                $stage
            );
        }
    }
}
