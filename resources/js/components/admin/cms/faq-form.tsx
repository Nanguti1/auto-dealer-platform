import { useForm } from '@inertiajs/react';
import { FormField, FormSection } from '@/components/admin/shared';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import type { Faq } from './types';

const categoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'shipping', label: 'Shipping' },
  { value: 'payment', label: 'Payment' },
  { value: 'returns', label: 'Returns' },
  { value: 'account', label: 'Account' },
  { value: 'vehicles', label: 'Vehicles' },
  { value: 'financing', label: 'Financing' },
];

export default function FaqForm({ faq, action, method = 'post' }: { faq?: Faq; action: string; method?: 'post' | 'put' }) {
  const { data, setData, post, put, processing, errors } = useForm({
    category: faq?.category ?? 'general',
    question: faq?.question ?? '',
    answer: faq?.answer ?? '',
    order: faq?.order ?? 0,
    is_published: faq?.is_published ?? false,
    is_visible: faq?.is_visible ?? true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (faq) {
      put(action);
    } else {
      post(action);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <FormSection gridCols={1}>
        <FormField
          name="category"
          label="Category"
          type="select"
          value={data.category}
          error={errors.category}
          options={categoryOptions}
          onChange={(value) => setData('category', value)}
        />
        <FormField
          name="question"
          label="Question"
          type="textarea"
          value={data.question}
          error={errors.question}
          onChange={(value) => setData('question', value)}
        />
        <FormField
          name="answer"
          label="Answer"
          type="textarea"
          value={data.answer}
          error={errors.answer}
          onChange={(value) => setData('answer', value)}
        />
        <FormField
          name="order"
          label="Display Order"
          type="number"
          value={String(data.order)}
          error={errors.order}
          onChange={(value) => setData('order', Number(value))}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={data.is_published}
          error={errors.is_published}
          onChange={(value) => setData('is_published', value)}
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={data.is_visible}
          error={errors.is_visible}
          onChange={(value) => setData('is_visible', value)}
        />
      </FormSection>
      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={processing}>
          <Save className="mr-2 size-4" />
          {processing ? 'Saving...' : 'Save FAQ'}
        </Button>
      </div>
    </form>
  );
}
