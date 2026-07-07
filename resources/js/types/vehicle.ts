export type VehicleCondition = 'new' | 'used' | 'certified';

export interface VehicleGalleryImage {
    id: number;
    path: string;
    alt: string;
    isPrimary: boolean;
}

export interface VehicleVideo {
    id: number;
    title: string;
    url: string;
    provider?: string | null;
}

export interface VehicleSpecificationItem {
    name: string;
    value: string;
    unit?: string | null;
}

export interface VehicleSpecificationGroup {
    group: string;
    items: VehicleSpecificationItem[];
}

export interface VehicleFeature {
    id: number;
    name: string;
    category: string;
}

export interface VehicleSummary {
    id: number;
    slug: string;
    name: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType?: string;
    seats: number;
    image: string;
    condition?: VehicleCondition;
    featured?: boolean;
    isWishlisted?: boolean;
    isInCompare?: boolean;
}

export interface VehicleDetail extends VehicleSummary {
    stockNumber: string;
    vin: string;
    msrp?: number | null;
    description: string;
    color?: string | null;
    interiorColor?: string | null;
    driveType?: string | null;
    engineType?: string | null;
    trim?: string | null;
    listedAt?: string | null;
    galleries: VehicleGalleryImage[];
    videos: VehicleVideo[];
    specifications: VehicleSpecificationGroup[];
    features: VehicleFeature[];
}

export interface FilterOption {
    value: string;
    label: string;
    count?: number;
}

export interface InventoryFilters {
    search?: string;
    make?: string;
    model?: string;
    bodyType?: string;
    fuelType?: string;
    transmission?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    minYear?: number;
    maxYear?: number;
    maxMileage?: number;
    sort?: string;
}

export interface FilterOptions {
    makes: FilterOption[];
    models: FilterOption[];
    bodyTypes: FilterOption[];
    fuelTypes: FilterOption[];
    transmissions: FilterOption[];
    conditions: FilterOption[];
}

export interface PaginatedVehicles {
    data: VehicleSummary[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{ url: string | null; label: string; active: boolean }>;
}

export interface SavedSearch {
    id: number;
    name: string;
    filters: InventoryFilters;
    notifyOnMatch: boolean;
    createdAt: string;
}

export interface CustomerNotification {
    id: number;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface CustomerReservation {
    id: number;
    vehicle: VehicleSummary;
    depositAmount: number;
    status: string;
    expiresAt?: string | null;
}

export interface CustomerBooking {
    id: number;
    vehicle: VehicleSummary;
    scheduledAt: string;
    status: string;
    notes?: string | null;
}
