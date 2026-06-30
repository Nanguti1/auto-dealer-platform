export interface ReservationRecord {
  id: number;
  vehicle_id: number | null;
  user_id: number | null;
  deposit_amount: number | null;
  status: string;
  expires_at: string | null;
  created_at: string;
  updated_at: string;
  vehicle?: {
    id: number;
    title: string;
    year: number;
    make: string;
    model: string;
    price: number;
  };
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface ReservationPagination {
  data: ReservationRecord[];
  current_page: number;
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface ReservationFilters {
  status?: string;
  vehicle_id?: string;
  user_id?: string;
  search?: string;
  sort?: string;
  direction?: 'asc' | 'desc';
}