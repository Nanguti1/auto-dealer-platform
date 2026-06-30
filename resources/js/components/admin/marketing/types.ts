import type { Paginated } from '@/components/admin/inventory/types';

export interface MarketingFilters { [key: string]: string | number | boolean | undefined }
export interface MarketingVehicle { id?: number; title?: string; stock_number?: string; year?: number; make?: string; model?: string; [key: string]: unknown }
export interface MarketingCustomer { id?: number; name?: string; email?: string; [key: string]: unknown }
export interface Promotion { id: number; name?: string; title?: string; slug?: string; type?: string; value?: string | number; discount?: string | number; description?: string; banner_path?: string; starts_at?: string; ends_at?: string; status?: string; visibility?: string; is_active?: boolean; rules?: Record<string, unknown> | null; vehicles?: MarketingVehicle[]; featured_vehicles?: MarketingVehicle[]; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface Review { id: number; user_id?: number; vehicle_id?: number; customer?: MarketingCustomer; user?: MarketingCustomer; vehicle?: MarketingVehicle; rating?: number; title?: string; body?: string; review?: string; status?: string; approved_at?: string | null; is_featured?: boolean; is_published?: boolean; reply?: string; created_at?: string; updated_at?: string; [key: string]: unknown }
export type PromotionPagination = Paginated<Promotion>;
export type ReviewPagination = Paginated<Review>;
