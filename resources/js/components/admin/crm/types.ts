import type { Paginated } from '@/components/admin/inventory/types';
import type { CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';

export interface LeadRecord {
  id: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  source?: string;
  status?: string;
  priority?: string;
  score?: number;
  budget?: string | number;
  crm_stage_id?: number;
  crm_stage?: CrmStage;
  crmStage?: CrmStage;
  assigned_user_id?: number;
  assigned_user?: { name?: string; email?: string };
  assignedUser?: { name?: string; email?: string };
  customer?: CustomerRecord;
  vehicle?: { id?: number; title?: string; stock_number?: string };
  vehicle_id?: number;
  last_contacted_at?: string;
  last_activity_at?: string;
  created_at?: string;
  updated_at?: string;
  notes?: CrmNote[];
  activities?: CrmActivity[];
  tasks?: CrmTask[];
  timeline?: TimelineEvent[];
  [key: string]: unknown;
}

export interface CrmStage {
  id: number;
  name: string;
  slug?: string;
  sort_order?: number;
  is_won?: boolean;
  is_lost?: boolean;
  leads?: LeadRecord[];
}

export interface CrmActivity {
  id: number;
  lead_id?: number;
  type?: string;
  status?: string;
  due_at?: string;
  completed_at?: string;
  notes?: string;
  lead?: LeadRecord;
  assigned_user?: { name?: string };
}

export interface CrmTask {
  id: number;
  lead_id?: number;
  assigned_user_id?: number;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  due_at?: string;
  completed_at?: string;
  lead?: LeadRecord;
  assigned_user?: { name?: string };
}

export interface CrmNote {
  id: number;
  body?: string;
  is_private?: boolean;
  created_at?: string;
  user?: { name?: string };
}

export type LeadPagination = Paginated<LeadRecord>;
export type CrmFilters = Record<string, string | number | boolean | undefined>;
