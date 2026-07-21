import { Link } from '@inertiajs/react';
import { Calendar, Image as ImageIcon, Pencil } from 'lucide-react';
import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import MarketingStatusBadge from '@/components/admin/marketing/marketing-status-badge';
import type { Promotion } from '@/components/admin/marketing/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ promotion }: { promotion: Promotion }) {
  const vehicles = promotion.featured_vehicles ?? promotion.vehicles ?? [];
  const description = promotion.description ?? (promotion.rules?.description as string) ?? '';
  const status = promotion.status ?? (promotion.rules?.status as string) ?? (promotion.is_active ? 'active' : 'draft');

  return <MarketingShell title={promotion.name ?? promotion.title ?? 'Promotion'} description={description || 'Promotion preview and campaign details.'} actions={<><MarketingBackButton /><Button asChild><Link href={`/admin/promotions/${promotion.id}/edit`}><Pencil className="mr-2 size-4" />Edit</Link></Button></>}><div className="grid gap-4 lg:grid-cols-3"><Card className="lg:col-span-2"><CardHeader><CardTitle>Preview</CardTitle></CardHeader><CardContent><div className="overflow-hidden rounded-xl border bg-muted"><div className="flex aspect-video items-center justify-center bg-muted">{promotion.banner_path ? <img src={promotion.banner_path} alt={promotion.name ?? 'Promotion banner'} className="h-full w-full object-cover" /> : <ImageIcon className="size-12 text-muted-foreground" />}</div><div className="space-y-3 bg-card p-6"><MarketingStatusBadge status={status} active={promotion.is_active} /><h2 className="text-2xl font-semibold">{promotion.name ?? promotion.title ?? 'Untitled campaign'}</h2><p className="text-muted-foreground">{description || 'No description provided.'}</p><p className="text-lg font-medium">Discount: {promotion.value ?? promotion.discount ?? '—'}</p></div></div></CardContent></Card><div className="space-y-4"><Card><CardHeader><CardTitle>Campaign details</CardTitle></CardHeader><CardContent className="space-y-3 text-sm"><Detail label="Type" value={promotion.type} /><Detail label="Visibility" value={promotion.visibility ?? String(promotion.rules?.visibility ?? 'public')} /><Detail label="Start" value={formatDate(promotion.starts_at)} /><Detail label="End" value={formatDate(promotion.ends_at)} /><div className="flex items-center gap-2 text-muted-foreground"><Calendar className="size-4" /> Created {formatDate(promotion.created_at)}</div></CardContent></Card><Card><CardHeader><CardTitle>Featured vehicles</CardTitle></CardHeader><CardContent className="space-y-2">{vehicles.length ? vehicles.map((vehicle) => <div key={vehicle.id ?? vehicle.title} className="rounded-lg border p-3 text-sm"><p className="font-medium">{vehicle.title ?? [vehicle.year, vehicle.make, vehicle.model].filter(Boolean).join(' ')}</p><p className="text-muted-foreground">{vehicle.stock_number ?? '—'}</p></div>) : <p className="text-sm text-muted-foreground">No featured vehicles provided by the backend.</p>}</CardContent></Card></div></div></MarketingShell>;
}
function Detail({ label, value }: { label: string; value?: string | number | null }) {
 return <div><span className="text-muted-foreground">{label}</span><p className="font-medium">{value ?? '—'}</p></div>; 
}
function formatDate(value?: string): string {
 return value ? new Date(value).toLocaleString() : '—'; 
}
