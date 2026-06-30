import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import type { Review } from './types';

export default function ReviewForm({ review, action, method = 'put' }: { review: Review; action: string; method?: 'put' | 'post' }) {
  return <Form action={action} method={method} className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">{({ errors, processing }) => <>
    {method === 'put' && <input type="hidden" name="_method" value="put" />}
    <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="title">Review title</Label><Input id="title" name="title" defaultValue={review.title ?? ''} /><InputError message={errors.title} /></div><div className="space-y-2"><Label htmlFor="rating">Rating</Label><Input id="rating" name="rating" type="number" min="1" max="5" defaultValue={String(review.rating ?? 5)} /><InputError message={errors.rating} /></div></div>
    <div className="space-y-2"><Label htmlFor="body">Review</Label><Textarea id="body" name="body" rows={5} defaultValue={review.body ?? review.review ?? ''} /><InputError message={errors.body} /></div>
    <div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="status">Approval status</Label><Input id="status" name="status" defaultValue={review.status ?? (review.approved_at ? 'approved' : 'pending')} /><InputError message={errors.status} /></div><div className="space-y-2"><Label htmlFor="reply">Reply</Label><Textarea id="reply" name="reply" rows={3} defaultValue={review.reply ?? ''} /><InputError message={errors.reply} /></div></div>
    <div className="grid gap-3 md:grid-cols-2"><div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="is_featured">Featured</Label><Switch id="is_featured" name="is_featured" defaultChecked={review.is_featured ?? false} value="1" /></div><div className="flex items-center justify-between rounded-lg border p-4"><Label htmlFor="is_published">Published</Label><Switch id="is_published" name="is_published" defaultChecked={review.is_published ?? Boolean(review.approved_at)} value="1" /></div></div>
    <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save review'}</Button>
  </>}</Form>;
}
