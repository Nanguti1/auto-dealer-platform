import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import PromotionForm from '@/components/admin/marketing/promotion-form';
import adminRoutes from '@/routes/admin';
import type { Promotion } from '@/components/admin/marketing/types';
export default function Edit({ promotion }: { promotion: Promotion }) {
 return <MarketingShell title="Edit Promotion" description="Update campaign content, discount, dates, and visibility." actions={<MarketingBackButton href={adminRoutes.promotions.show(promotion.id).url} />}><PromotionForm promotion={promotion} action={adminRoutes.promotions.update(promotion.id).url} method="put" /></MarketingShell>;
}
