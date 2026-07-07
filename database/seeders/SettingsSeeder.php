<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General Settings
            [
                'group' => 'general',
                'key' => 'app_name',
                'value' => 'Car Listings',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'general',
                'key' => 'app_url',
                'value' => 'http://localhost',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'general',
                'key' => 'timezone',
                'value' => 'America/New_York',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'general',
                'key' => 'locale',
                'value' => 'en',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'general',
                'key' => 'date_format',
                'value' => 'Y-m-d',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'general',
                'key' => 'time_format',
                'value' => 'H:i',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'general',
                'key' => 'currency',
                'value' => 'USD',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'general',
                'key' => 'currency_symbol',
                'value' => '$',
                'type' => 'string',
                'is_public' => true,
            ],
            // Company Settings
            [
                'group' => 'company',
                'key' => 'company_name',
                'value' => 'Car Dealership',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'company',
                'key' => 'company_email',
                'value' => 'info@cardealership.com',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'company',
                'key' => 'company_phone',
                'value' => '+1-555-123-4567',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'company',
                'key' => 'company_address',
                'value' => '123 Main Street, City, State 12345',
                'type' => 'string',
                'is_public' => true,
            ],
            // Vehicle Settings
            [
                'group' => 'vehicles',
                'key' => 'default_vehicle_status',
                'value' => 'draft',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'vehicles',
                'key' => 'vehicles_per_page',
                'value' => '12',
                'type' => 'integer',
                'is_public' => false,
            ],
            [
                'group' => 'vehicles',
                'key' => 'featured_vehicles_count',
                'value' => '6',
                'type' => 'integer',
                'is_public' => false,
            ],
            [
                'group' => 'vehicles',
                'key' => 'max_vehicle_images',
                'value' => '20',
                'type' => 'integer',
                'is_public' => false,
            ],
            // Lead Settings
            [
                'group' => 'leads',
                'key' => 'lead_notification_email',
                'value' => 'leads@cardealership.com',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'leads',
                'key' => 'lead_auto_response',
                'value' => 'true',
                'type' => 'boolean',
                'is_public' => false,
            ],
            [
                'group' => 'leads',
                'key' => 'lead_response_time_hours',
                'value' => '24',
                'type' => 'integer',
                'is_public' => false,
            ],
            // Test Drive Settings
            [
                'group' => 'test_drives',
                'key' => 'test_drive_duration_minutes',
                'value' => '30',
                'type' => 'integer',
                'is_public' => false,
            ],
            [
                'group' => 'test_drives',
                'key' => 'test_drive_advance_days',
                'value' => '7',
                'type' => 'integer',
                'is_public' => false,
            ],
            // Reservation Settings
            [
                'group' => 'reservations',
                'key' => 'reservation_deposit_amount',
                'value' => '500',
                'type' => 'decimal',
                'is_public' => false,
            ],
            [
                'group' => 'reservations',
                'key' => 'reservation_duration_days',
                'value' => '3',
                'type' => 'integer',
                'is_public' => false,
            ],
            // Trade-In Settings
            [
                'group' => 'trade_ins',
                'key' => 'trade_in_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'is_public' => false,
            ],
            [
                'group' => 'trade_ins',
                'key' => 'trade_in_auto_response',
                'value' => 'true',
                'type' => 'boolean',
                'is_public' => false,
            ],
            // Finance Settings
            [
                'group' => 'finance',
                'key' => 'finance_enabled',
                'value' => 'true',
                'type' => 'boolean',
                'is_public' => false,
            ],
            [
                'group' => 'finance',
                'key' => 'finance_notification_email',
                'value' => 'finance@cardealership.com',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'finance',
                'key' => 'min_loan_amount',
                'value' => '5000',
                'type' => 'decimal',
                'is_public' => false,
            ],
            [
                'group' => 'finance',
                'key' => 'max_loan_amount',
                'value' => '100000',
                'type' => 'decimal',
                'is_public' => false,
            ],
            // SEO Settings
            [
                'group' => 'seo',
                'key' => 'default_meta_title',
                'value' => 'Car Listings - Find Your Perfect Vehicle',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'seo',
                'key' => 'default_meta_description',
                'value' => 'Browse our extensive inventory of quality vehicles',
                'type' => 'string',
                'is_public' => false,
            ],
            [
                'group' => 'seo',
                'key' => 'default_meta_keywords',
                'value' => 'cars, vehicles, dealership, auto sales',
                'type' => 'string',
                'is_public' => false,
            ],
            // Social Media Settings
            [
                'group' => 'social',
                'key' => 'facebook_url',
                'value' => 'https://facebook.com/cardealership',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'social',
                'key' => 'twitter_url',
                'value' => 'https://twitter.com/cardealership',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'social',
                'key' => 'instagram_url',
                'value' => 'https://instagram.com/cardealership',
                'type' => 'string',
                'is_public' => true,
            ],
            [
                'group' => 'social',
                'key' => 'youtube_url',
                'value' => 'https://youtube.com/cardealership',
                'type' => 'string',
                'is_public' => true,
            ],
            // Maintenance Settings
            [
                'group' => 'maintenance',
                'key' => 'maintenance_mode',
                'value' => 'false',
                'type' => 'boolean',
                'is_public' => false,
            ],
            [
                'group' => 'maintenance',
                'key' => 'maintenance_message',
                'value' => 'We are currently performing maintenance. Please check back soon.',
                'type' => 'string',
                'is_public' => true,
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['key' => $setting['key']],
                $setting
            );
        }
    }
}
