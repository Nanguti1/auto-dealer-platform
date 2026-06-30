import type { Paginated } from '@/components/admin/inventory/types';

export interface CustomerRecord {
  id: number;
  customer_number?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  status?: string;
  avatar_url?: string;
  address?: CustomerAddress;
  preferences?: Record<string, string | number | boolean | null | undefined>;
  purchases_count?: number;
  reservations_count?: number;
  finance_applications_count?: number;
  trade_ins_count?: number;
  import_requests_count?: number;
  wishlist_count?: number;
  saved_searches_count?: number;
  recently_viewed_count?: number;
  documents_count?: number;
  notes_count?: number;
  last_activity_at?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface CustomerAddress {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export interface CustomerNote {
  id: number;
  customer_id?: number;
  title?: string;
  body?: string;
  note?: string;
  type?: string;
  is_pinned?: boolean;
  created_at?: string;
  updated_at?: string;
  author?: { name?: string };
}

export interface CustomerDocument {
  id: number;
  customer_id?: number;
  name?: string;
  title?: string;
  file_name?: string;
  file_type?: string;
  mime_type?: string;
  size?: number;
  url?: string;
  path?: string;
  status?: string;
  created_at?: string;
  uploaded_by?: { name?: string };
}

export interface TimelineEvent {
  id: number | string;
  type?: string;
  title?: string;
  description?: string;
  occurred_at?: string;
  created_at?: string;
  actor?: string;
  status?: string;
}

export type CustomerPagination = Paginated<CustomerRecord>;
export type CustomerFilters = Record<string, string | number | boolean | undefined>;
