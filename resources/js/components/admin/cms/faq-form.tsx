import { FormShell, FormField, FormSection } from '@/components/admin/shared';
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
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save FAQ"
      className="max-w-2xl"
    >
      <FormSection gridCols={1}>
        <FormField
          name="category"
          label="Category"
          type="select"
          value={faq?.category ?? 'general'}
          options={categoryOptions}
          onChange={() => {}}
        />
        <FormField
          name="question"
          label="Question"
          type="textarea"
          value={faq?.question ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="answer"
          label="Answer"
          type="textarea"
          value={faq?.answer ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="order"
          label="Display Order"
          type="number"
          value={String(faq?.order ?? 0)}
          onChange={() => {}}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={faq?.is_published ?? false}
          onChange={() => {}}
        />
        <FormField
          name="is_visible"
          label="Visible"
          type="switch"
          value={faq?.is_visible ?? true}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
