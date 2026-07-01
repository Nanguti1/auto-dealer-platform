import type { CustomerRecord, TimelineEvent } from '@/components/admin/customers/types';
import type { ImportVehicle } from '@/components/admin/imports/types';
import type { Paginated } from '@/components/admin/inventory/types';

export interface PaymentVehicle { id?: number; title?: string; stock_number?: string; vin?: string; year?: number; make?: string | { name?: string }; model?: string | { name?: string }; mileage?: number; sale_price?: string | number; image_url?: string; [key: string]: unknown }
export interface PaymentUser { id?: number; name?: string; email?: string; phone?: string; first_name?: string; last_name?: string; avatar_url?: string }
export interface PaymentReservation { id?: number; status?: string; expires_at?: string; created_at?: string; [key: string]: unknown }
export interface PaymentFinanceApplication { id?: number; status?: string; amount?: string | number; [key: string]: unknown }
export interface PaymentImportRequest { id?: number; status?: string; estimated_cost?: string | number; [key: string]: unknown }
export interface PaymentTradeIn { id?: number; status?: string; estimated_value?: string | number; [key: string]: unknown }
export interface Payment { id: number; user_id?: number; vehicle_id?: number; vehicle_reservation_id?: number; amount?: string | number; currency?: string; method?: string; status?: string; transaction_reference?: string; paid_at?: string; metadata?: Record<string, unknown>; customer?: CustomerRecord; user?: PaymentUser; vehicle?: PaymentVehicle; vehicleReservation?: PaymentReservation; finance_application?: PaymentFinanceApplication; import_request?: PaymentImportRequest; trade_in?: PaymentTradeIn; timeline?: TimelineEvent[]; notes?: Array<{ id: number; title?: string; body?: string; note?: string }>; processed_by?: PaymentUser; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface Invoice { id: number; invoice_number?: string; customer_id?: number; vehicle_id?: number; reservation_id?: number; amount?: string | number; currency?: string; status?: string; due_date?: string; paid_at?: string; paid_amount?: string | number; subtotal?: string | number; tax_amount?: string | number; total_amount?: string | number; line_items?: Array<{ description?: string; quantity?: number; unit_price?: string | number; total?: string | number }>; taxes?: string | number; discounts?: string | number; notes?: string; customer?: CustomerRecord; vehicle?: PaymentVehicle; payments?: Payment[]; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface Receipt { id: number; receipt_number?: string; payment_id?: number; customer_id?: number; amount?: string | number; currency?: string; payment_method?: string; issued_at?: string; notes?: string; customer?: CustomerRecord; payment?: Payment; created_at?: string; updated_at?: string; [key: string]: unknown }
export interface Refund { id: number; payment_id?: number; amount?: string | number; currency?: string; reason?: string; status?: string; approved_by?: PaymentUser; refund_method?: string; processed_at?: string; original_payment?: Payment; timeline?: TimelineEvent[]; created_at?: string; updated_at?: string; [key: string]: unknown }
export type PaymentPagination = Paginated<Payment>;
export type PaymentFilters = Record<string, string | number | boolean | undefined>;
export type InvoicePagination = Paginated<Invoice>;
export type ReceiptPagination = Paginated<Receipt>;
export type RefundPagination = Paginated<Refund>;
