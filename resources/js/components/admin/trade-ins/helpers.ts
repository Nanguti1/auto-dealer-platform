import { customerName } from '@/components/admin/customers/helpers';
import { imageUrl, vehicleName as inventoryVehicleName } from '@/components/admin/inventory/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { TradeInRequest, TradeInUser, TradeInVehicle } from './types';

export { formatDate, formatDateTime, formatCurrency, formatNumber, imageUrl };

export function userName(user?: TradeInUser): string {
  return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
}

export function tradeInVehicleName(request?: TradeInRequest): string {
  return [request?.year, request?.make, request?.model].filter(Boolean).join(' ') || 'Trade-in vehicle';
}

export function vehicleName(vehicle?: TradeInVehicle): string {
  return inventoryVehicleName(vehicle as Parameters<typeof inventoryVehicleName>[0]);
}

export function requesterName(request: TradeInRequest): string {
  return request.customer ? customerName(request.customer) : userName(request.user);
}

export const desiredVehicle = (request: TradeInRequest) => request.desired_vehicle ?? request.desiredVehicle ?? request.vehicle;
