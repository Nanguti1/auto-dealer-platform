<?php

namespace Database\Seeders;

use App\Models\VehicleFeature;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class VehicleFeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        VehicleFeature::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $features = [
            // Safety Features
            ['name' => 'Anti-lock Braking System (ABS)', 'category' => 'Safety'],
            ['name' => 'Airbags - Driver', 'category' => 'Safety'],
            ['name' => 'Airbags - Passenger', 'category' => 'Safety'],
            ['name' => 'Airbags - Side', 'category' => 'Safety'],
            ['name' => 'Airbags - Curtain', 'category' => 'Safety'],
            ['name' => 'Traction Control', 'category' => 'Safety'],
            ['name' => 'Electronic Stability Control (ESC)', 'category' => 'Safety'],
            ['name' => 'Brake Assist', 'category' => 'Safety'],
            ['name' => 'Hill Start Assist', 'category' => 'Safety'],
            ['name' => 'Hill Descent Control', 'category' => 'Safety'],
            ['name' => 'Rear View Camera', 'category' => 'Safety'],
            ['name' => 'Parking Sensors - Front', 'category' => 'Safety'],
            ['name' => 'Parking Sensors - Rear', 'category' => 'Safety'],
            ['name' => 'Blind Spot Monitoring', 'category' => 'Safety'],
            ['name' => 'Lane Departure Warning', 'category' => 'Safety'],
            ['name' => 'Lane Keep Assist', 'category' => 'Safety'],
            ['name' => 'Collision Warning System', 'category' => 'Safety'],
            ['name' => 'Automatic Emergency Braking', 'category' => 'Safety'],
            ['name' => 'Child Safety Locks', 'category' => 'Safety'],
            ['name' => 'Tire Pressure Monitoring System', 'category' => 'Safety'],
            ['name' => 'ISOFIX Child Seat Anchors', 'category' => 'Safety'],

            // Comfort Features
            ['name' => 'Air Conditioning - Manual', 'category' => 'Comfort'],
            ['name' => 'Air Conditioning - Automatic Climate Control', 'category' => 'Comfort'],
            ['name' => 'Dual Zone Climate Control', 'category' => 'Comfort'],
            ['name' => 'Tri Zone Climate Control', 'category' => 'Comfort'],
            ['name' => 'Quad Zone Climate Control', 'category' => 'Comfort'],
            ['name' => 'Heated Seats - Front', 'category' => 'Comfort'],
            ['name' => 'Heated Seats - Rear', 'category' => 'Comfort'],
            ['name' => 'Ventilated Seats - Front', 'category' => 'Comfort'],
            ['name' => 'Ventilated Seats - Rear', 'category' => 'Comfort'],
            ['name' => 'Power Seats - Driver', 'category' => 'Comfort'],
            ['name' => 'Power Seats - Passenger', 'category' => 'Comfort'],
            ['name' => 'Memory Seats - Driver', 'category' => 'Comfort'],
            ['name' => 'Memory Seats - Passenger', 'category' => 'Comfort'],
            ['name' => 'Power Steering', 'category' => 'Comfort'],
            ['name' => 'Power Windows', 'category' => 'Comfort'],
            ['name' => 'Power Door Locks', 'category' => 'Comfort'],
            ['name' => 'Keyless Entry', 'category' => 'Comfort'],
            ['name' => 'Push Button Start', 'category' => 'Comfort'],
            ['name' => 'Remote Start', 'category' => 'Comfort'],
            ['name' => 'Cruise Control', 'category' => 'Comfort'],
            ['name' => 'Steering Wheel Controls', 'category' => 'Comfort'],
            ['name' => 'Adjustable Steering Wheel', 'category' => 'Comfort'],
            ['name' => 'Heated Steering Wheel', 'category' => 'Comfort'],
            ['name' => 'Leather Wrapped Steering Wheel', 'category' => 'Comfort'],
            ['name' => 'Auto-Dimming Rearview Mirror', 'category' => 'Comfort'],
            ['name' => 'Sun Visors - Illuminated', 'category' => 'Comfort'],
            ['name' => 'Sun Visors - Extended', 'category' => 'Comfort'],

            // Technology Features
            ['name' => 'Bluetooth Connectivity', 'category' => 'Technology'],
            ['name' => 'USB Port', 'category' => 'Technology'],
            ['name' => 'USB Port - Multiple', 'category' => 'Technology'],
            ['name' => 'AUX Input', 'category' => 'Technology'],
            ['name' => 'Wireless Charging', 'category' => 'Technology'],
            ['name' => 'Wi-Fi Hotspot', 'category' => 'Technology'],
            ['name' => 'GPS Navigation System', 'category' => 'Technology'],
            ['name' => 'Voice Command', 'category' => 'Technology'],
            ['name' => 'Touchscreen Display', 'category' => 'Technology'],
            ['name' => 'Infotainment System', 'category' => 'Technology'],
            ['name' => 'Apple CarPlay', 'category' => 'Technology'],
            ['name' => 'Android Auto', 'category' => 'Technology'],
            ['name' => 'Premium Audio System', 'category' => 'Technology'],
            ['name' => 'Surround Sound System', 'category' => 'Technology'],
            ['name' => 'Subwoofer', 'category' => 'Technology'],
            ['name' => 'AM/FM Radio', 'category' => 'Technology'],
            ['name' => 'Satellite Radio', 'category' => 'Technology'],
            ['name' => 'HD Radio', 'category' => 'Technology'],
            ['name' => 'CD Player', 'category' => 'Technology'],
            ['name' => 'MP3 Player', 'category' => 'Technology'],
            ['name' => 'Digital Instrument Cluster', 'category' => 'Technology'],
            ['name' => 'Head-Up Display', 'category' => 'Technology'],
            ['name' => 'Smartphone Integration', 'category' => 'Technology'],

            // Performance Features
            ['name' => 'Turbocharger', 'category' => 'Performance'],
            ['name' => 'Supercharger', 'category' => 'Performance'],
            ['name' => 'Sport Mode', 'category' => 'Performance'],
            ['name' => 'Launch Control', 'category' => 'Performance'],
            ['name' => 'Performance Exhaust', 'category' => 'Performance'],
            ['name' => 'Sport Suspension', 'category' => 'Performance'],
            ['name' => 'Adaptive Suspension', 'category' => 'Performance'],
            ['name' => 'Air Suspension', 'category' => 'Performance'],
            ['name' => 'Sport Seats', 'category' => 'Performance'],
            ['name' => 'Sport Steering Wheel', 'category' => 'Performance'],
            ['name' => 'Paddle Shifters', 'category' => 'Performance'],
            ['name' => 'Limited Slip Differential', 'category' => 'Performance'],
            ['name' => 'Performance Brakes', 'category' => 'Performance'],
            ['name' => 'Brembo Brakes', 'category' => 'Performance'],
            ['name' => 'Carbon Fiber Body Parts', 'category' => 'Performance'],
            ['name' => 'Lightweight Wheels', 'category' => 'Performance'],

            // Exterior Features
            ['name' => 'Sunroof - Manual', 'category' => 'Exterior'],
            ['name' => 'Sunroof - Power', 'category' => 'Exterior'],
            ['name' => 'Moonroof', 'category' => 'Exterior'],
            ['name' => 'Panoramic Sunroof', 'category' => 'Exterior'],
            ['name' => 'Alloy Wheels', 'category' => 'Exterior'],
            ['name' => 'Chrome Wheels', 'category' => 'Exterior'],
            ['name' => 'Steel Wheels', 'category' => 'Exterior'],
            ['name' => 'Spare Tire - Full Size', 'category' => 'Exterior'],
            ['name' => 'Spare Tire - Compact', 'category' => 'Exterior'],
            ['name' => 'Run-Flat Tires', 'category' => 'Exterior'],
            ['name' => 'Fog Lights - Front', 'category' => 'Exterior'],
            ['name' => 'Fog Lights - Rear', 'category' => 'Exterior'],
            ['name' => 'LED Headlights', 'category' => 'Exterior'],
            ['name' => 'Xenon Headlights', 'category' => 'Exterior'],
            ['name' => 'Halogen Headlights', 'category' => 'Exterior'],
            ['name' => 'Adaptive Headlights', 'category' => 'Exterior'],
            ['name' => 'Automatic Headlights', 'category' => 'Exterior'],
            ['name' => 'Daytime Running Lights', 'category' => 'Exterior'],
            ['name' => 'LED Taillights', 'category' => 'Exterior'],
            ['name' => 'Power Mirrors', 'category' => 'Exterior'],
            ['name' => 'Heated Mirrors', 'category' => 'Exterior'],
            ['name' => 'Folding Mirrors', 'category' => 'Exterior'],
            ['name' => 'Auto-Folding Mirrors', 'category' => 'Exterior'],
            ['name' => 'Rain Sensing Wipers', 'category' => 'Exterior'],
            ['name' => 'Rear Wiper', 'category' => 'Exterior'],
            ['name' => 'Roof Rack', 'category' => 'Exterior'],
            ['name' => 'Tow Hitch', 'category' => 'Exterior'],
            ['name' => 'Running Boards', 'category' => 'Exterior'],
            ['name' => 'Mud Flaps', 'category' => 'Exterior'],
            ['name' => 'Body Kit', 'category' => 'Exterior'],
            ['name' => 'Spoiler', 'category' => 'Exterior'],
            ['name' => 'Carbon Fiber Spoiler', 'category' => 'Exterior'],

            // Interior Features
            ['name' => 'Leather Seats', 'category' => 'Interior'],
            ['name' => 'Leatherette Seats', 'category' => 'Interior'],
            ['name' => 'Cloth Seats', 'category' => 'Interior'],
            ['name' => 'Suede Seats', 'category' => 'Interior'],
            ['name' => 'Vinyl Seats', 'category' => 'Interior'],
            ['name' => 'Bucket Seats', 'category' => 'Interior'],
            ['name' => 'Captain Chairs', 'category' => 'Interior'],
            ['name' => 'Bench Seat - Front', 'category' => 'Interior'],
            ['name' => 'Bench Seat - Rear', 'category' => 'Interior'],
            ['name' => 'Split Folding Rear Seat', 'category' => 'Interior'],
            ['name' => 'Removable Seats', 'category' => 'Interior'],
            ['name' => 'Wood Trim', 'category' => 'Interior'],
            ['name' => 'Carbon Fiber Trim', 'category' => 'Interior'],
            ['name' => 'Aluminum Trim', 'category' => 'Interior'],
            ['name' => 'Chrome Trim', 'category' => 'Interior'],
            ['name' => 'Piano Black Trim', 'category' => 'Interior'],
            ['name' => 'Ambient Lighting', 'category' => 'Interior'],
            ['name' => 'Mood Lighting', 'category' => 'Interior'],
            ['name' => 'Interior Accent Lighting', 'category' => 'Interior'],
            ['name' => 'Glove Box - Cooled', 'category' => 'Interior'],
            ['name' => 'Center Console', 'category' => 'Interior'],
            ['name' => 'Cup Holders - Front', 'category' => 'Interior'],
            ['name' => 'Cup Holders - Rear', 'category' => 'Interior'],
            ['name' => 'Reading Lights', 'category' => 'Interior'],
            ['name' => 'Map Lights', 'category' => 'Interior'],
            ['name' => 'Cargo Area Light', 'category' => 'Interior'],
            ['name' => 'Trunk Light', 'category' => 'Interior'],
            ['name' => 'Cargo Cover', 'category' => 'Interior'],
            ['name' => 'Cargo Net', 'category' => 'Interior'],
            ['name' => 'Cargo Management System', 'category' => 'Interior'],

            // Security Features
            ['name' => 'Alarm System', 'category' => 'Security'],
            ['name' => 'Immobilizer', 'category' => 'Security'],
            ['name' => 'Remote Keyless Entry', 'category' => 'Security'],
            ['name' => 'Keyless Go', 'category' => 'Security'],
            ['name' => 'Smart Key System', 'category' => 'Security'],
            ['name' => 'Vehicle Locator', 'category' => 'Security'],
            ['name' => 'GPS Tracking', 'category' => 'Security'],
            ['name' => 'Stolen Vehicle Tracking', 'category' => 'Security'],
            ['name' => 'Valet Mode', 'category' => 'Security'],
            ['name' => 'Locking Fuel Cap', 'category' => 'Security'],
            ['name' => 'Spare Key Wheel Lock', 'category' => 'Security'],

            // Fuel Efficiency Features
            ['name' => 'Start-Stop System', 'category' => 'Fuel Efficiency'],
            ['name' => 'Hybrid System', 'category' => 'Fuel Efficiency'],
            ['name' => 'Plug-in Hybrid', 'category' => 'Fuel Efficiency'],
            ['name' => 'Electric Motor', 'category' => 'Fuel Efficiency'],
            ['name' => 'Regenerative Braking', 'category' => 'Fuel Efficiency'],
            ['name' => 'Fuel Economy Indicator', 'category' => 'Fuel Efficiency'],
            ['name' => 'Range Indicator', 'category' => 'Fuel Efficiency'],

            // Convenience Features
            ['name' => 'Power Liftgate', 'category' => 'Convenience'],
            ['name' => 'Hands-Free Liftgate', 'category' => 'Convenience'],
            ['name' => 'Power Trunk Release', 'category' => 'Convenience'],
            ['name' => 'Remote Trunk Release', 'category' => 'Convenience'],
            ['name' => 'Power Tailgate', 'category' => 'Convenience'],
            ['name' => 'Sliding Doors', 'category' => 'Convenience'],
            ['name' => 'Power Sliding Doors', 'category' => 'Convenience'],
            ['name' => 'Automatic Sliding Doors', 'category' => 'Convenience'],
            ['name' => 'Power Windows - Auto Up/Down', 'category' => 'Convenience'],
            ['name' => 'Rain-Sensing Windows', 'category' => 'Convenience'],
            ['name' => 'Gesture Control', 'category' => 'Convenience'],
            ['name' => 'Voice-Activated Controls', 'category' => 'Convenience'],
        ];

        foreach ($features as $feature) {
            VehicleFeature::create([
                'name' => $feature['name'],
                'slug' => Str::slug($feature['name']),
                'category' => $feature['category'],
                'is_active' => true,
            ]);
        }

        $this->command->info('Vehicle features seeded successfully!');
    }
}
