import adminRoutes from '@/routes/admin';
import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import ReviewForm from '@/components/admin/marketing/review-form';
import type { Review } from '@/components/admin/marketing/types';

export default function Create() {
  return (
    <MarketingShell title="Create Customer Review" description="Add a new customer review with rating, content, and approval settings." actions={<MarketingBackButton />}>
      <ReviewForm review={{} as Review} action={adminRoutes.reviews.store().url} method="post" />
    </MarketingShell>
  );
}
