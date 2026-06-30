export function userName(user?: { name?: string; first_name?: string; last_name?: string; email?: string }): string {
  return user?.name ?? ([user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.email || 'Unassigned');
}

export function customerName(customer?: { first_name?: string; last_name?: string; email?: string; customer_number?: string }): string {
  const name = [customer?.first_name, customer?.last_name].filter(Boolean).join(' ').trim();
  return name || customer?.email || customer?.customer_number || 'Unnamed customer';
}

export function vehicleName(vehicle?: { title?: string; year?: number; make?: { name?: string }; model?: { name?: string }; stock_number?: string }): string {
  return vehicle?.title ?? ([vehicle?.year, vehicle?.make?.name, vehicle?.model?.name].filter(Boolean).join(' ') || vehicle?.stock_number || 'Untitled vehicle');
}
