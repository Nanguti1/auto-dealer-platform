export interface PaginationLink { url: string | null; label: string; active: boolean }
export interface Paginated<T> { data: T[]; links?: PaginationLink[]; current_page?: number; last_page?: number; total?: number; from?: number; to?: number }
export interface AdminVehicle { id: number; title?: string; stock_number?: string; vin?: string; year?: number; sale_price?: string | number; msrp?: string | number; mileage?: number; is_featured?: boolean; is_certified?: boolean; description?: string; slug?: string; created_at?: string; updated_at?: string; media?: any[]; [key: string]: unknown }
export interface AdminGallery { id: number; vehicle_id?: number; path?: string; alt_text?: string; is_primary?: boolean; sort_order?: number; vehicle?: AdminVehicle; [key: string]: unknown }
export interface AdminFeature { id: number; name?: string; title?: string; slug?: string; category?: string; is_active?: boolean; status?: string; [key: string]: unknown }
export type Filters = Record<string, string | number | boolean | undefined>;
