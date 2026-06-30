import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { TradeInOffer } from './types';
export default function OfferForm({ offer, action, tradeInRequestId }: { offer?: TradeInOffer; action: string; tradeInRequestId?: number }) {
  return <Form action={action} method="post" className="grid max-w-3xl gap-4 rounded-xl border bg-card p-4">{({ errors, processing }) => <><input type="hidden" name="_method" value={offer ? 'put' : 'post'} />{tradeInRequestId ? <input type="hidden" name="trade_in_request_id" value={tradeInRequestId} /> : null}<div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Offer amount</Label><Input name="amount" type="number" defaultValue={offer?.amount ?? offer?.offer_amount ?? ''} /><InputError message={errors.amount ?? errors.offer_amount} /></div><div className="space-y-2"><Label>Expiration date</Label><Input name="expires_at" type="datetime-local" defaultValue={offer?.expires_at ?? offer?.expiration_date ?? ''} /><InputError message={errors.expires_at} /></div><div className="space-y-2"><Label>Status</Label><Input name="status" defaultValue={offer?.status ?? 'draft'} /><InputError message={errors.status} /></div><div className="space-y-2"><Label>Approval status</Label><Input name="approval_status" defaultValue={offer?.approval_status ?? 'pending'} /></div></div><div className="space-y-2"><Label>Notes</Label><Textarea name="notes" defaultValue={offer?.notes ?? ''} rows={5} /></div><Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save offer'}</Button></>}</Form>;
}
