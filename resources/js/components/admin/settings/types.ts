import type { Paginated } from '@/components/admin/inventory/types';

export interface AdminSetting {
  id: number;
  group?: string;
  key?: string;
  value?: string | number | boolean | Record<string, unknown> | unknown[] | null;
  type?: string;
  is_public?: boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export type AdminSettingsPagination = Paginated<AdminSetting>;
export type SettingsFilters = Record<string, string | number | boolean | undefined>;
