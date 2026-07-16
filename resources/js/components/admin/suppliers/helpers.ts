import type { SupplierRecord } from './types';

export function supplierName(supplier: SupplierRecord): string {
  return supplier.company_name || 'Unknown Supplier';
}

export function supplierTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    vehicle_dealer: 'Vehicle Dealer',
    vehicle_manufacturer: 'Vehicle Manufacturer',
    spare_parts_supplier: 'Spare Parts Supplier',
    accessories_supplier: 'Accessories Supplier',
    auction_house: 'Auction House',
    individual: 'Individual',
    other: 'Other',
  };
  return labels[type] || type;
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    blacklisted: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function formatDate(date: string | null): string {
  if (!date) return '—';
  return new Date(date).toLocaleDateString();
}

export function supplierTypeNameLabel(type: string): string {
  return supplierTypeLabel(type);
}

export function supplierTypeColor(type: string): string {
  const colors: Record<string, string> = {
    vehicle_dealer: 'bg-blue-100 text-blue-800',
    vehicle_manufacturer: 'bg-purple-100 text-purple-800',
    spare_parts_supplier: 'bg-orange-100 text-orange-800',
    accessories_supplier: 'bg-pink-100 text-pink-800',
    auction_house: 'bg-yellow-100 text-yellow-800',
    individual: 'bg-green-100 text-green-800',
    other: 'bg-gray-100 text-gray-800',
  };
  return colors[type] || 'bg-gray-100 text-gray-800';
}
