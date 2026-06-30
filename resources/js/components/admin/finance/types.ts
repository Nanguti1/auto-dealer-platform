import type { Paginated } from '@/components/admin/inventory/types';
import type { CustomerDocument, CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';
import type { LeadRecord } from '@/components/admin/crm/types';
import type { TradeInRequest } from '@/components/admin/trade-ins/types';

export interface FinanceUser {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
}

export interface FinanceVehicle {
  id?: number;
  title?: string;
  stock_number?: string;
  vin?: string;
  year?: number;
  make?: string | { name?: string };
  model?: string | { name?: string };
  sale_price?: string | number;
  price?: string | number;
  mileage?: number;
  [key: string]: unknown;
}

export interface PaymentInstallment {
  id?: number;
  installment?: number;
  number?: number;
  due_date?: string;
  due_at?: string;
  principal?: string | number;
  interest?: string | number;
  remaining_balance?: string | number;
  balance?: string | number;
  status?: string;
}

export interface FinanceApplication {
  id: number;
  user_id?: number;
  vehicle_id?: number;
  lender_id?: number;
  requested_amount?: string | number;
  down_payment?: string | number;
  deposit?: string | number;
  term_months?: number;
  loan_term?: number;
  interest_rate?: string | number;
  estimated_monthly_payment?: string | number;
  monthly_payment?: string | number;
  status?: string;
  approval_status?: string;
  applicant_data?: Record<string, unknown>;
  customer?: CustomerRecord;
  user?: FinanceUser;
  vehicle?: FinanceVehicle;
  lender?: { id?: number; name?: string };
  assigned_user?: FinanceUser;
  assignedUser?: FinanceUser;
  officer?: FinanceUser;
  approval_history?: TimelineEvent[];
  timeline?: TimelineEvent[];
  status_timeline?: TimelineEvent[];
  documents?: CustomerDocument[];
  notes?: Array<{ id: number; title?: string; body?: string; note?: string }>;
  trade_in?: TradeInRequest;
  tradeIn?: TradeInRequest;
  lead?: LeadRecord;
  reservation?: { id: number; status?: string; vehicle?: FinanceVehicle };
  import_request?: { id: number; status?: string; vehicle?: FinanceVehicle };
  payment_schedule?: PaymentInstallment[];
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface FinanceDocument extends CustomerDocument {
  finance_application_id?: number;
  approval_status?: string;
  uploaded_by?: FinanceUser;
  uploadedBy?: FinanceUser;
}

export type FinanceApplicationPagination = Paginated<FinanceApplication>;
export type FinanceDocumentPagination = Paginated<FinanceDocument>;
export type FinanceFilters = Record<string, string | number | boolean | undefined>;
