import { formatCurrency, formatNumber, imageUrl, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { customerName } from '@/components/admin/customers/helpers';
import type { TradeInRequest, TradeInUser, TradeInVehicle } from './types';

export { formatCurrency, formatNumber, imageUrl };
export const formatDateTime = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) : '—';
export const formatDate = (value?: string) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(value)) : '—';
export function userName(user?: TradeInUser): string { return user?.name ?? [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned'; }
export function tradeInVehicleName(request?: TradeInRequest): string { return [request?.year, request?.make, request?.model].filter(Boolean).join(' ') || 'Trade-in vehicle'; }
export function vehicleName(vehicle?: TradeInVehicle): string { return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]); }
export function requesterName(request: TradeInRequest): string { return request.customer ? customerName(request.customer) : userName(request.user); }
export const desiredVehicle = (request: TradeInRequest) => request.desired_vehicle ?? request.desiredVehicle ?? request.vehicle;
