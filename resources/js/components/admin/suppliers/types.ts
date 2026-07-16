export interface SupplierRecord {
  id: number;
  branch_id: number | null;
  company_name: string;
  supplier_code: string;
  contact_person: string | null;
  supplier_type: 'vehicle_dealer' | 'vehicle_manufacturer' | 'spare_parts_supplier' | 'accessories_supplier' | 'auction_house' | 'individual' | 'other';
  email: string | null;
  phone: string | null;
  alternative_phone: string | null;
  website: string | null;
  country: string | null;
  county: string | null;
  city: string | null;
  postal_code: string | null;
  physical_address: string | null;
  tax_pin: string | null;
  registration_number: string | null;
  payment_terms: string | null;
  currency: string;
  credit_limit: number;
  status: 'active' | 'inactive' | 'blacklisted';
  notes: string | null;
  created_by: number | null;
  updated_by: number | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  branch?: {
    id: number;
    name: string;
  };
  createdBy?: {
    id: number;
    name: string;
    email: string;
  };
  updatedBy?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface SupplierPagination {
  data: SupplierRecord[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
}

export interface SupplierFilters {
  search?: string;
  status?: string;
  supplier_type?: string;
  page?: number;
}
