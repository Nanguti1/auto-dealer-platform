import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { ImageDropzone } from '@/components/shared/media-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { Promotion } from './types';

export default function PromotionForm({ promotion, action, method = 'post' }: { promotion?: Promotion; action: string; method?: 'post' | 'put' }) {
  const rules = promotion?.rules ?? {};
  return <Form action={action} method={method} encType="multipart/form-data" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">{({ errors, processing }) => <>
    {method === 'put' && <input type="hidden" name="_method" value="put" />}
    <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Campaign name</Label><Input id="name" name="name" defaultValue={promotion?.name ?? promotion?.title ?? ''} /><InputError message={errors.name ?? errors.title} /></div><div className="space-y-2"><Label htmlFor="type">Promotion type</Label><Select name="type" defaultValue={promotion?.type ?? 'discount'}><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="discount">Discount</SelectItem><SelectItem value="seasonal">Seasonal</SelectItem><SelectItem value="featured_vehicle">Featured vehicle</SelectItem><SelectItem value="finance">Finance</SelectItem></SelectContent></Select><InputError message={errors.type} /></div></div>
    <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" rows={4} defaultValue={promotion?.description ?? String(rules.description ?? '')} /><InputError message={errors.description} /></div>
    <div className="space-y-2"><Label htmlFor="banner">Banner</Label><ImageDropzone multiple={false} onFilesSelected={(files) => { const input = document.querySelector('input[name="banner"]') as HTMLInputElement | null; if (input && files[0]) { const transfer = new DataTransfer(); transfer.items.add(files[0]); input.files = transfer.files; } }} /><Input id="banner" name="banner" type="file" accept="image/*" className="hidden" />{promotion?.banner_path ? <p className="text-sm text-muted-foreground">Current: {promotion.banner_path}</p> : null}<InputError message={errors.banner} /></div>
    <div className="grid gap-4 md:grid-cols-3"><div className="space-y-2"><Label htmlFor="value">Discount</Label><Input id="value" name="value" type="number" step="0.01" defaultValue={String(promotion?.value ?? promotion?.discount ?? '')} /><InputError message={errors.value} /></div><div className="space-y-2"><Label htmlFor="starts_at">Start date</Label><Input id="starts_at" name="starts_at" type="datetime-local" defaultValue={formatDate(promotion?.starts_at)} /><InputError message={errors.starts_at} /></div><div className="space-y-2"><Label htmlFor="ends_at">End date</Label><Input id="ends_at" name="ends_at" type="datetime-local" defaultValue={formatDate(promotion?.ends_at)} /><InputError message={errors.ends_at} /></div></div>
    <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="status">Status</Label><Input id="status" name="status" defaultValue={promotion?.status ?? (promotion?.is_active ? 'active' : 'draft')} /><InputError message={errors.status} /></div><div className="space-y-2"><Label htmlFor="visibility">Visibility</Label><Select name="visibility" defaultValue={promotion?.visibility ?? String(rules.visibility ?? 'public')}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="public">Public</SelectItem><SelectItem value="private">Private</SelectItem><SelectItem value="featured">Featured</SelectItem></SelectContent></Select></div></div>
    <div className="space-y-2"><Label htmlFor="featured_vehicles">Featured vehicles</Label><Textarea id="featured_vehicles" name="featured_vehicles" rows={2} defaultValue={(promotion?.featured_vehicles ?? promotion?.vehicles ?? []).map((vehicle) => vehicle.title ?? vehicle.stock_number ?? vehicle.id).join(', ')} placeholder="Use existing backend format or vehicle identifiers" /></div>
    <div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="is_active">Active</Label><Switch id="is_active" name="is_active" defaultChecked={promotion?.is_active ?? true} value="1" /></div>
    <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save promotion'}</Button>
  </>}</Form>;
}

function formatDate(value?: string): string { return value ? new Date(value).toISOString().slice(0, 16) : ''; }
