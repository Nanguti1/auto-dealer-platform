const route = (url: string, method = 'get') => ({ url, method });
const resource = (base: string) => ({
  index: () => route(base),
  create: () => route(`${base}/create`),
  store: { form: () => ({ action: base, method: 'post' }) },
  show: (id: number | string) => route(`${base}/${id}`),
  edit: (id: number | string) => route(`${base}/${id}/edit`),
  update: { form: (id: number | string) => ({ action: `${base}/${id}`, method: 'post' }) },
  destroy: (id: number | string) => route(`${base}/${id}`, 'delete'),
});

const vehicles = { ...resource('/admin/vehicles'), feature: (id: number | string) => route(`/admin/vehicles/${id}/feature`, 'patch'), unfeature: (id: number | string) => route(`/admin/vehicles/${id}/unfeature`, 'patch'), markSold: (id: number | string) => route(`/admin/vehicles/${id}/mark-sold`, 'patch'), duplicate: (id: number | string) => route(`/admin/vehicles/${id}/duplicate`, 'post') };

export const admin = {
  dashboard: { index: () => route('/admin/dashboard') },
  vehicles,
  vehicleGalleries: resource('/admin/vehicle-galleries'),
  vehicleFeatures: resource('/admin/vehicle-features'),
  customers: resource('/admin/customers'),
  leads: resource('/admin/leads'),
  financeApplications: resource('/admin/finance-applications'),
  financeDocuments: resource('/admin/finance-documents'),
  tradeIns: resource('/admin/trade-ins'),
  tradeInOffers: resource('/admin/trade-in-offers'),
  settings: resource('/admin/settings'),
};
