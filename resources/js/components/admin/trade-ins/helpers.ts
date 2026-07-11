import { userName as sharedUserName, vehicleName as sharedVehicleName } from '@/lib/name-utils';
import { customerName } from '@/components/admin/customers/helpers';
import { imageUrl } from '@/components/admin/inventory/helpers';
import { formatDate, formatDateTime } from '@/lib/date-utils';
import { formatCurrency, formatNumber } from '@/lib/format-utils';
import type { TradeInRequest, TradeInUser, TradeInVehicle } from './types';

export { formatDate, formatDateTime, formatNumber, imageUrl, sharedUserName as userName, sharedVehicleName as vehicleName };
export { formatCurrency };

export function tradeInVehicleName(request?: TradeInRequest): string {
  return [request?.year, request?.make, request?.model].filter(Boolean).join(' ') || 'Trade-in vehicle';
}

export function requesterName(request: TradeInRequest): string {
  return request.customer ? customerName(request.customer) : userName(request.user);
}

export const desiredVehicle = (request: TradeInRequest) => request.desired_vehicle ?? request.desiredVehicle ?? request.vehicle;
