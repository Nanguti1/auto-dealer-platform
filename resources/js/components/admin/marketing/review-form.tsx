import { FormShell, FormField, FormSection } from '@/components/admin/shared';
import type { Review } from './types';

export default function ReviewForm({ review, action, method = 'put' }: { review: Review; action: string; method?: 'put' | 'post' }) {
  return (
    <FormShell
      action={action}
      method={method}
      submitLabel="Save review"
      className="max-w-3xl"
    >
      <FormSection title="Review Details" gridCols={2}>
        <FormField
          name="title"
          label="Review title"
          value={review.title ?? ''}
          onChange={() => {}}
        />
        <FormField
          name="rating"
          label="Rating"
          type="number"
          min="1"
          max="5"
          value={String(review.rating ?? 5)}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Review Content" gridCols={1} fullWidth>
        <FormField
          name="body"
          label="Review"
          type="textarea"
          value={review.body ?? review.review ?? ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Approval & Reply" gridCols={2}>
        <FormField
          name="status"
          label="Approval status"
          value={review.status ?? (review.approved_at ? 'approved' : 'pending')}
          onChange={() => {}}
        />
        <FormField
          name="reply"
          label="Reply"
          type="textarea"
          value={review.reply ?? ''}
          onChange={() => {}}
        />
      </FormSection>

      <FormSection title="Options" gridCols={2}>
        <FormField
          name="is_featured"
          label="Featured"
          type="switch"
          value={review.is_featured ?? false}
          onChange={() => {}}
        />
        <FormField
          name="is_published"
          label="Published"
          type="switch"
          value={review.is_published ?? Boolean(review.approved_at)}
          onChange={() => {}}
        />
      </FormSection>
    </FormShell>
  );
}
