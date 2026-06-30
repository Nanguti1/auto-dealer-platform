import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import ReviewForm from '@/components/admin/marketing/review-form';
import type { Review } from '@/components/admin/marketing/types';
export default function Edit({ review }: { review: Review }) {
 return <MarketingShell title="Edit Customer Review" description="Update approval, featured and published states, review copy, and staff reply." actions={<MarketingBackButton href={`/admin/reviews/${review.id}`} />}><ReviewForm review={review} action={`/admin/reviews/${review.id}`} method="put" /></MarketingShell>; 
}
