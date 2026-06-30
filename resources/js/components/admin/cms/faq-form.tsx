import { Form } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import type { Faq } from './types';

export default function FaqForm({ faq, action, method = 'post' }: { faq?: Faq; action: string; method?: 'post' | 'put' }) {
  return (
    <Form action={action} method={method} className="grid max-w-2xl gap-4 rounded-xl border bg-card p-4">
      {({ errors, processing }) => (
        <>
          {method === 'put' && <input type="hidden" name="_method" value="put" />}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" defaultValue={faq?.category ?? 'general'}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="returns">Returns</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="vehicles">Vehicles</SelectItem>
                <SelectItem value="financing">Financing</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.category} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea id="question" name="question" rows={2} defaultValue={faq?.question ?? ''} />
            <InputError message={errors.question} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Textarea id="answer" name="answer" rows={6} defaultValue={faq?.answer ?? ''} />
            <InputError message={errors.answer} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order">Display Order</Label>
            <Input id="order" name="order" type="number" defaultValue={String(faq?.order ?? 0)} />
            <InputError message={errors.order} />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_published">Published</Label>
            <Switch id="is_published" name="is_published" defaultChecked={faq?.is_published ?? false} value="1" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <Label htmlFor="is_visible">Visible</Label>
            <Switch id="is_visible" name="is_visible" defaultChecked={faq?.is_visible ?? true} value="1" />
          </div>
          <Button className="w-fit" disabled={processing}>{processing ? 'Saving…' : 'Save FAQ'}</Button>
        </>
      )}
    </Form>
  );
}
