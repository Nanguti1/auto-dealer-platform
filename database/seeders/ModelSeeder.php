<?php

namespace Database\Seeders;

use App\Models\Make;
use App\Models\Model;
use Illuminate\Database\Seeder;

class ModelSeeder extends Seeder
{
    public function run(): void
    {
        $models = [
            // Toyota
            ['make' => 'Toyota', 'name' => 'Camry', 'slug' => 'camry'],
            ['make' => 'Toyota', 'name' => 'Corolla', 'slug' => 'corolla'],
            ['make' => 'Toyota', 'name' => 'RAV4', 'slug' => 'rav4'],
            ['make' => 'Toyota', 'name' => 'Highlander', 'slug' => 'highlander'],
            ['make' => 'Toyota', 'name' => 'Tacoma', 'slug' => 'tacoma'],
            ['make' => 'Toyota', 'name' => 'Tundra', 'slug' => 'tundra'],
            ['make' => 'Toyota', 'name' => 'Prius', 'slug' => 'prius'],
            ['make' => 'Toyota', 'name' => 'Sienna', 'slug' => 'sienna'],
            ['make' => 'Toyota', 'name' => '4Runner', 'slug' => '4runner'],

            // Honda
            ['make' => 'Honda', 'name' => 'Civic', 'slug' => 'civic'],
            ['make' => 'Honda', 'name' => 'Accord', 'slug' => 'accord'],
            ['make' => 'Honda', 'name' => 'CR-V', 'slug' => 'cr-v'],
            ['make' => 'Honda', 'name' => 'Pilot', 'slug' => 'pilot'],
            ['make' => 'Honda', 'name' => 'Odyssey', 'slug' => 'odyssey'],
            ['make' => 'Honda', 'name' => 'HR-V', 'slug' => 'hr-v'],
            ['make' => 'Honda', 'name' => 'Passport', 'slug' => 'passport'],
            ['make' => 'Honda', 'name' => 'Ridgeline', 'slug' => 'ridgeline'],

            // Ford
            ['make' => 'Ford', 'name' => 'F-150', 'slug' => 'f-150'],
            ['make' => 'Ford', 'name' => 'Mustang', 'slug' => 'mustang'],
            ['make' => 'Ford', 'name' => 'Explorer', 'slug' => 'explorer'],
            ['make' => 'Ford', 'name' => 'Escape', 'slug' => 'escape'],
            ['make' => 'Ford', 'name' => 'Edge', 'slug' => 'edge'],
            ['make' => 'Ford', 'name' => 'Bronco', 'slug' => 'bronco'],
            ['make' => 'Ford', 'name' => 'Ranger', 'slug' => 'ranger'],
            ['make' => 'Ford', 'name' => 'Expedition', 'slug' => 'expedition'],

            // Chevrolet
            ['make' => 'Chevrolet', 'name' => 'Silverado', 'slug' => 'silverado'],
            ['make' => 'Chevrolet', 'name' => 'Equinox', 'slug' => 'equinox'],
            ['make' => 'Chevrolet', 'name' => 'Tahoe', 'slug' => 'tahoe'],
            ['make' => 'Chevrolet', 'name' => 'Suburban', 'slug' => 'suburban'],
            ['make' => 'Chevrolet', 'name' => 'Malibu', 'slug' => 'malibu'],
            ['make' => 'Chevrolet', 'name' => 'Traverse', 'slug' => 'traverse'],
            ['make' => 'Chevrolet', 'name' => 'Blazer', 'slug' => 'blazer'],
            ['make' => 'Chevrolet', 'name' => 'Corvette', 'slug' => 'corvette'],

            // BMW
            ['make' => 'BMW', 'name' => '3 Series', 'slug' => '3-series'],
            ['make' => 'BMW', 'name' => '5 Series', 'slug' => '5-series'],
            ['make' => 'BMW', 'name' => '7 Series', 'slug' => '7-series'],
            ['make' => 'BMW', 'name' => 'X3', 'slug' => 'x3'],
            ['make' => 'BMW', 'name' => 'X5', 'slug' => 'x5'],
            ['make' => 'BMW', 'name' => 'X7', 'slug' => 'x7'],
            ['make' => 'BMW', 'name' => 'M3', 'slug' => 'm3'],
            ['make' => 'BMW', 'name' => 'M5', 'slug' => 'm5'],

            // Mercedes-Benz
            ['make' => 'Mercedes-Benz', 'name' => 'C-Class', 'slug' => 'c-class'],
            ['make' => 'Mercedes-Benz', 'name' => 'E-Class', 'slug' => 'e-class'],
            ['make' => 'Mercedes-Benz', 'name' => 'S-Class', 'slug' => 's-class'],
            ['make' => 'Mercedes-Benz', 'name' => 'GLC', 'slug' => 'glc'],
            ['make' => 'Mercedes-Benz', 'name' => 'GLE', 'slug' => 'gle'],
            ['make' => 'Mercedes-Benz', 'name' => 'GLS', 'slug' => 'gls'],
            ['make' => 'Mercedes-Benz', 'name' => 'AMG GT', 'slug' => 'amg-gt'],
            ['make' => 'Mercedes-Benz', 'name' => 'G-Class', 'slug' => 'g-class'],

            // Audi
            ['make' => 'Audi', 'name' => 'A4', 'slug' => 'a4'],
            ['make' => 'Audi', 'name' => 'A6', 'slug' => 'a6'],
            ['make' => 'Audi', 'name' => 'A8', 'slug' => 'a8'],
            ['make' => 'Audi', 'name' => 'Q3', 'slug' => 'q3'],
            ['make' => 'Audi', 'name' => 'Q5', 'slug' => 'q5'],
            ['make' => 'Audi', 'name' => 'Q7', 'slug' => 'q7'],
            ['make' => 'Audi', 'name' => 'Q8', 'slug' => 'q8'],
            ['make' => 'Audi', 'name' => 'RS e-tron GT', 'slug' => 'rs-e-tron-gt'],

            // Volkswagen
            ['make' => 'Volkswagen', 'name' => 'Jetta', 'slug' => 'jetta'],
            ['make' => 'Volkswagen', 'name' => 'Passat', 'slug' => 'passat'],
            ['make' => 'Volkswagen', 'name' => 'Tiguan', 'slug' => 'tiguan'],
            ['make' => 'Volkswagen', 'name' => 'Atlas', 'slug' => 'atlas'],
            ['make' => 'Volkswagen', 'name' => 'Golf', 'slug' => 'golf'],
            ['make' => 'Volkswagen', 'name' => 'ID.4', 'slug' => 'id-4'],

            // Nissan
            ['make' => 'Nissan', 'name' => 'Altima', 'slug' => 'altima'],
            ['make' => 'Nissan', 'name' => 'Sentra', 'slug' => 'sentra'],
            ['make' => 'Nissan', 'name' => 'Rogue', 'slug' => 'rogue'],
            ['make' => 'Nissan', 'name' => 'Pathfinder', 'slug' => 'pathfinder'],
            ['make' => 'Nissan', 'name' => 'Frontier', 'slug' => 'frontier'],
            ['make' => 'Nissan', 'name' => 'Titan', 'slug' => 'titan'],
            ['make' => 'Nissan', 'name' => 'Leaf', 'slug' => 'leaf'],
            ['make' => 'Nissan', 'name' => '370Z', 'slug' => '370z'],

            // Hyundai
            ['make' => 'Hyundai', 'name' => 'Elantra', 'slug' => 'elantra'],
            ['make' => 'Hyundai', 'name' => 'Sonata', 'slug' => 'sonata'],
            ['make' => 'Hyundai', 'name' => 'Tucson', 'slug' => 'tucson'],
            ['make' => 'Hyundai', 'name' => 'Santa Fe', 'slug' => 'santa-fe'],
            ['make' => 'Hyundai', 'name' => 'Palisade', 'slug' => 'palisade'],
            ['make' => 'Hyundai', 'name' => 'Venue', 'slug' => 'venue'],
            ['make' => 'Hyundai', 'name' => 'Kona', 'slug' => 'kona'],
            ['make' => 'Hyundai', 'name' => 'Ioniq 5', 'slug' => 'ioniq-5'],

            // Kia
            ['make' => 'Kia', 'name' => 'Forte', 'slug' => 'forte'],
            ['make' => 'Kia', 'name' => 'K5', 'slug' => 'k5'],
            ['make' => 'Kia', 'name' => 'Sportage', 'slug' => 'sportage'],
            ['make' => 'Kia', 'name' => 'Sorento', 'slug' => 'sorento'],
            ['make' => 'Kia', 'name' => 'Telluride', 'slug' => 'telluride'],
            ['make' => 'Kia', 'name' => 'Soul', 'slug' => 'soul'],
            ['make' => 'Kia', 'name' => 'EV6', 'slug' => 'ev6'],

            // Subaru
            ['make' => 'Subaru', 'name' => 'Outback', 'slug' => 'outback'],
            ['make' => 'Subaru', 'name' => 'Forester', 'slug' => 'forester'],
            ['make' => 'Subaru', 'name' => 'Impreza', 'slug' => 'impreza'],
            ['make' => 'Subaru', 'name' => 'Legacy', 'slug' => 'legacy'],
            ['make' => 'Subaru', 'name' => 'Ascent', 'slug' => 'ascent'],
            ['make' => 'Subaru', 'name' => 'Crosstrek', 'slug' => 'crosstrek'],
            ['make' => 'Subaru', 'name' => 'WRX', 'slug' => 'wrx'],
            ['make' => 'Subaru', 'name' => 'BRZ', 'slug' => 'brz'],

            // Mazda
            ['make' => 'Mazda', 'name' => 'Mazda3', 'slug' => 'mazda3'],
            ['make' => 'Mazda', 'name' => 'Mazda6', 'slug' => 'mazda6'],
            ['make' => 'Mazda', 'name' => 'CX-5', 'slug' => 'cx-5'],
            ['make' => 'Mazda', 'name' => 'CX-9', 'slug' => 'cx-9'],
            ['make' => 'Mazda', 'name' => 'CX-30', 'slug' => 'cx-30'],
            ['make' => 'Mazda', 'name' => 'MX-5 Miata', 'slug' => 'mx-5-miata'],

            // Lexus
            ['make' => 'Lexus', 'name' => 'ES', 'slug' => 'es'],
            ['make' => 'Lexus', 'name' => 'LS', 'slug' => 'ls'],
            ['make' => 'Lexus', 'name' => 'RX', 'slug' => 'rx'],
            ['make' => 'Lexus', 'name' => 'NX', 'slug' => 'nx'],
            ['make' => 'Lexus', 'name' => 'GX', 'slug' => 'gx'],
            ['make' => 'Lexus', 'name' => 'LX', 'slug' => 'lx'],
            ['make' => 'Lexus', 'name' => 'IS', 'slug' => 'is'],
            ['make' => 'Lexus', 'name' => 'LC', 'slug' => 'lc'],

            // Tesla
            ['make' => 'Tesla', 'name' => 'Model 3', 'slug' => 'model-3'],
            ['make' => 'Tesla', 'name' => 'Model Y', 'slug' => 'model-y'],
            ['make' => 'Tesla', 'name' => 'Model S', 'slug' => 'model-s'],
            ['make' => 'Tesla', 'name' => 'Model X', 'slug' => 'model-x'],
            ['make' => 'Tesla', 'name' => 'Cybertruck', 'slug' => 'cybertruck'],

            // Porsche
            ['make' => 'Porsche', 'name' => '911', 'slug' => '911'],
            ['make' => 'Porsche', 'name' => 'Cayenne', 'slug' => 'cayenne'],
            ['make' => 'Porsche', 'name' => 'Macan', 'slug' => 'macan'],
            ['make' => 'Porsche', 'name' => 'Taycan', 'slug' => 'taycan'],
            ['make' => 'Porsche', 'name' => 'Panamera', 'slug' => 'panamera'],

            // Jeep
            ['make' => 'Jeep', 'name' => 'Wrangler', 'slug' => 'wrangler'],
            ['make' => 'Jeep', 'name' => 'Grand Cherokee', 'slug' => 'grand-cherokee'],
            ['make' => 'Jeep', 'name' => 'Cherokee', 'slug' => 'cherokee'],
            ['make' => 'Jeep', 'name' => 'Compass', 'slug' => 'compass'],
            ['make' => 'Jeep', 'name' => 'Renegade', 'slug' => 'renegade'],
            ['make' => 'Jeep', 'name' => 'Gladiator', 'slug' => 'gladiator'],

            // Ram
            ['make' => 'Ram', 'name' => '1500', 'slug' => '1500'],
            ['make' => 'Ram', 'name' => '2500', 'slug' => '2500'],
            ['make' => 'Ram', 'name' => '3500', 'slug' => '3500'],

            // Cadillac
            ['make' => 'Cadillac', 'name' => 'Escalade', 'slug' => 'escalade'],
            ['make' => 'Cadillac', 'name' => 'XT5', 'slug' => 'xt5'],
            ['make' => 'Cadillac', 'name' => 'XT6', 'slug' => 'xt6'],
            ['make' => 'Cadillac', 'name' => 'CT4', 'slug' => 'ct4'],
            ['make' => 'Cadillac', 'name' => 'CT5', 'slug' => 'ct5'],
            ['make' => 'Cadillac', 'name' => 'Lyriq', 'slug' => 'lyriq'],

            // Volvo
            ['make' => 'Volvo', 'name' => 'XC60', 'slug' => 'xc60'],
            ['make' => 'Volvo', 'name' => 'XC90', 'slug' => 'xc90'],
            ['make' => 'Volvo', 'name' => 'S60', 'slug' => 's60'],
            ['make' => 'Volvo', 'name' => 'S90', 'slug' => 's90'],
            ['make' => 'Volvo', 'name' => 'V60', 'slug' => 'v60'],
            ['make' => 'Volvo', 'name' => 'V90', 'slug' => 'v90'],
        ];

        foreach ($models as $modelData) {
            $make = Make::where('slug', $modelData['make'])->first();
            if ($make) {
                Model::firstOrCreate(
                    ['slug' => $modelData['slug']],
                    [
                        'make_id' => $make->id,
                        'name' => $modelData['name'],
                        'slug' => $modelData['slug'],
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
