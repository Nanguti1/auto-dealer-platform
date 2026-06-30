import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import PromotionForm from '@/components/admin/marketing/promotion-form';
import type { Promotion } from '@/components/admin/marketing/types';
export default function Edit({ promotion }: { promotion: Promotion }) { return <MarketingShell title="Edit Promotion" description="Update campaign content, discount, dates, and visibility." actions={<MarketingBackButton href={`/admin/promotions/${promotion.id}`} />}><PromotionForm promotion={promotion} action={`/admin/promotions/${promotion.id}`} method="put" /></MarketingShell>; }
