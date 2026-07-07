import type { FilterOptions, VehicleDetail, VehicleSummary } from '@/types/vehicle';

const image = (seed: string) => `https://picsum.photos/seed/${seed}/1200/800`;

export const mockVehicles: VehicleDetail[] = [
    {
        id: 1,
        slug: '2024-tesla-model-s',
        name: '2024 Tesla Model S Plaid',
        brand: 'Tesla',
        model: 'Model S',
        year: 2024,
        price: 89990,
        mileage: 0,
        fuelType: 'Electric',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        seats: 5,
        image: image('tesla-model-s'),
        condition: 'new',
        featured: true,
        stockNumber: 'TS-2024-001',
        vin: '5YJSA1E47HF000001',
        msrp: 94990,
        description:
            'Experience unparalleled performance with the Tesla Model S Plaid. Tri-motor all-wheel drive, ludicrous acceleration, and a minimalist luxury interior redefine what a sedan can be.',
        color: 'Pearl White',
        interiorColor: 'Black',
        driveType: 'AWD',
        engineType: 'Tri Motor Electric',
        trim: 'Plaid',
        listedAt: '2024-01-15',
        galleries: [
            { id: 1, path: image('tesla-1'), alt: 'Tesla Model S front', isPrimary: true },
            { id: 2, path: image('tesla-2'), alt: 'Tesla Model S side', isPrimary: false },
            { id: 3, path: image('tesla-3'), alt: 'Tesla Model S interior', isPrimary: false },
            { id: 4, path: image('tesla-4'), alt: 'Tesla Model S rear', isPrimary: false },
        ],
        videos: [
            { id: 1, title: 'Model S Overview', url: 'https://www.youtube.com/embed/title', provider: 'youtube' },
        ],
        specifications: [
            {
                group: 'Performance',
                items: [
                    { name: '0-60 mph', value: '1.99', unit: 'sec' },
                    { name: 'Top Speed', value: '200', unit: 'mph' },
                    { name: 'Range', value: '396', unit: 'mi' },
                ],
            },
            {
                group: 'Dimensions',
                items: [
                    { name: 'Length', value: '196', unit: 'in' },
                    { name: 'Width', value: '77', unit: 'in' },
                    { name: 'Height', value: '57', unit: 'in' },
                ],
            },
        ],
        features: [
            { id: 1, name: 'Autopilot', category: 'Safety' },
            { id: 2, name: 'Premium Audio', category: 'Comfort' },
            { id: 3, name: 'Heated Seats', category: 'Comfort' },
            { id: 4, name: 'Glass Roof', category: 'Exterior' },
        ],
    },
    {
        id: 2,
        slug: '2023-bmw-x5',
        name: '2023 BMW X5 xDrive45e',
        brand: 'BMW',
        model: 'X5',
        year: 2023,
        price: 65990,
        mileage: 12500,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        bodyType: 'SUV',
        seats: 7,
        image: image('bmw-x5'),
        condition: 'used',
        featured: true,
        stockNumber: 'BM-2023-042',
        vin: '5UXCR6C05P9N00002',
        msrp: 72900,
        description:
            'The BMW X5 xDrive45e combines plug-in hybrid efficiency with the commanding presence and versatility of a luxury SUV.',
        color: 'Alpine White',
        interiorColor: 'Cognac',
        driveType: 'AWD',
        engineType: 'Inline-6 Hybrid',
        trim: 'xDrive45e',
        listedAt: '2024-02-01',
        galleries: [
            { id: 5, path: image('bmw-1'), alt: 'BMW X5 front', isPrimary: true },
            { id: 6, path: image('bmw-2'), alt: 'BMW X5 interior', isPrimary: false },
        ],
        videos: [],
        specifications: [
            {
                group: 'Engine',
                items: [
                    { name: 'Horsepower', value: '389', unit: 'hp' },
                    { name: 'Torque', value: '443', unit: 'lb-ft' },
                ],
            },
        ],
        features: [
            { id: 5, name: 'Panoramic Roof', category: 'Exterior' },
            { id: 6, name: 'Navigation', category: 'Technology' },
        ],
    },
    {
        id: 3,
        slug: '2024-mercedes-e-class',
        name: '2024 Mercedes-Benz E-Class',
        brand: 'Mercedes-Benz',
        model: 'E-Class',
        year: 2024,
        price: 72990,
        mileage: 0,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Sedan',
        seats: 5,
        image: image('mercedes-e'),
        condition: 'new',
        featured: true,
        stockNumber: 'MB-2024-018',
        vin: 'W1KZF8DB5PB000003',
        description: 'Refined elegance meets cutting-edge technology in the all-new Mercedes-Benz E-Class.',
        color: 'Obsidian Black',
        interiorColor: 'Macchiato Beige',
        driveType: 'RWD',
        engineType: 'Inline-4 Turbo',
        trim: 'E350',
        galleries: [{ id: 7, path: image('mercedes-1'), alt: 'Mercedes E-Class', isPrimary: true }],
        videos: [],
        specifications: [],
        features: [{ id: 7, name: 'MBUX', category: 'Technology' }],
    },
    {
        id: 4,
        slug: '2024-porsche-911',
        name: '2024 Porsche 911 Carrera',
        brand: 'Porsche',
        model: '911',
        year: 2024,
        price: 115990,
        mileage: 500,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'Coupe',
        seats: 4,
        image: image('porsche-911'),
        condition: 'new',
        stockNumber: 'PO-2024-007',
        vin: 'WP0AA2A94RS000004',
        description: 'The iconic Porsche 911 Carrera — timeless design, exhilarating performance, everyday usability.',
        color: 'Guards Red',
        interiorColor: 'Black',
        driveType: 'RWD',
        engineType: 'Flat-6 Turbo',
        trim: 'Carrera',
        galleries: [{ id: 8, path: image('porsche-1'), alt: 'Porsche 911', isPrimary: true }],
        videos: [{ id: 2, title: '911 Walkaround', url: 'https://www.youtube.com/embed/title', provider: 'youtube' }],
        specifications: [{ group: 'Performance', items: [{ name: '0-60 mph', value: '3.8', unit: 'sec' }] }],
        features: [{ id: 8, name: 'Sport Chrono', category: 'Performance' }],
    },
    {
        id: 5,
        slug: '2023-audi-q8',
        name: '2023 Audi Q8 Premium',
        brand: 'Audi',
        model: 'Q8',
        year: 2023,
        price: 78990,
        mileage: 8500,
        fuelType: 'Gasoline',
        transmission: 'Automatic',
        bodyType: 'SUV',
        seats: 5,
        image: image('audi-q8'),
        condition: 'used',
        stockNumber: 'AU-2023-031',
        vin: 'WA1EVAF1XPD000005',
        description: 'Bold coupe-like styling meets SUV practicality in the Audi Q8.',
        color: 'Daytona Gray',
        galleries: [{ id: 9, path: image('audi-1'), alt: 'Audi Q8', isPrimary: true }],
        videos: [],
        specifications: [],
        features: [],
    },
    {
        id: 6,
        slug: '2024-range-rover',
        name: '2024 Land Rover Range Rover',
        brand: 'Land Rover',
        model: 'Range Rover',
        year: 2024,
        price: 105990,
        mileage: 0,
        fuelType: 'Hybrid',
        transmission: 'Automatic',
        bodyType: 'SUV',
        seats: 5,
        image: image('range-rover'),
        condition: 'certified',
        featured: false,
        stockNumber: 'LR-2024-012',
        vin: 'SALWA2BK5RA000006',
        description: 'The definitive luxury SUV. Unmatched refinement, capability, and presence.',
        color: 'Santorini Black',
        galleries: [{ id: 10, path: image('rr-1'), alt: 'Range Rover', isPrimary: true }],
        videos: [],
        specifications: [],
        features: [{ id: 9, name: 'Terrain Response', category: 'Capability' }],
    },
];

export const mockFilterOptions: FilterOptions = {
    makes: [
        { value: 'tesla', label: 'Tesla', count: 1 },
        { value: 'bmw', label: 'BMW', count: 1 },
        { value: 'mercedes-benz', label: 'Mercedes-Benz', count: 1 },
        { value: 'porsche', label: 'Porsche', count: 1 },
        { value: 'audi', label: 'Audi', count: 1 },
        { value: 'land-rover', label: 'Land Rover', count: 1 },
    ],
    models: [],
    bodyTypes: [
        { value: 'sedan', label: 'Sedan', count: 2 },
        { value: 'suv', label: 'SUV', count: 3 },
        { value: 'coupe', label: 'Coupe', count: 1 },
    ],
    fuelTypes: [
        { value: 'electric', label: 'Electric', count: 1 },
        { value: 'hybrid', label: 'Hybrid', count: 2 },
        { value: 'gasoline', label: 'Gasoline', count: 3 },
    ],
    transmissions: [
        { value: 'automatic', label: 'Automatic', count: 6 },
    ],
    conditions: [
        { value: 'new', label: 'New', count: 3 },
        { value: 'used', label: 'Used', count: 2 },
        { value: 'certified', label: 'Certified', count: 1 },
    ],
};

export function toSummary(vehicle: VehicleDetail): VehicleSummary {
    const { galleries, videos, specifications, features, description, stockNumber, vin, msrp, color, interiorColor, driveType, engineType, trim, listedAt, ...summary } = vehicle;

    return summary;
}

export function findVehicleBySlug(slug: string): VehicleDetail | undefined {
    return mockVehicles.find((v) => v.slug === slug);
}

export function findVehicleById(id: number): VehicleDetail | undefined {
    return mockVehicles.find((v) => v.id === id);
}

export function filterVehicles(filters: Record<string, string | number | undefined>): VehicleSummary[] {
    let results = mockVehicles.map(toSummary);

    if (filters.search) {
        const q = String(filters.search).toLowerCase();
        results = results.filter(
            (v) =>
                v.name.toLowerCase().includes(q) ||
                v.brand.toLowerCase().includes(q) ||
                v.model.toLowerCase().includes(q),
        );
    }

    if (filters.make) {
        results = results.filter((v) => v.brand.toLowerCase().replace(/\s+/g, '-') === filters.make);
    }

    if (filters.bodyType) {
        results = results.filter((v) => v.bodyType?.toLowerCase() === filters.bodyType);
    }

    if (filters.condition) {
        results = results.filter((v) => v.condition === filters.condition);
    }

    if (filters.minPrice) {
        results = results.filter((v) => v.price >= Number(filters.minPrice));
    }

    if (filters.maxPrice) {
        results = results.filter((v) => v.price <= Number(filters.maxPrice));
    }

    const sort = filters.sort ?? 'newest';

    if (sort === 'price_asc') {
results.sort((a, b) => a.price - b.price);
}

    if (sort === 'price_desc') {
results.sort((a, b) => b.price - a.price);
}

    if (sort === 'mileage_asc') {
results.sort((a, b) => a.mileage - b.mileage);
}

    return results;
}
