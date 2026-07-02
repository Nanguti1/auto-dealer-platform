import adminRoutes from '@/routes/admin';
import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import PromotionForm from '@/components/admin/marketing/promotion-form';
export default function Create() {
 return <MarketingShell title="Create Promotion" description="Create a marketing campaign using the existing promotions backend." actions={<MarketingBackButton />}><PromotionForm action={adminRoutes.promotions.store().url} method="post" /></MarketingShell>; 
}
