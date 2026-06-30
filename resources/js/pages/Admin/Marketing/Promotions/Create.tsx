import MarketingShell, { MarketingBackButton } from '@/components/admin/marketing/marketing-shell';
import PromotionForm from '@/components/admin/marketing/promotion-form';
export default function Create() {
 return <MarketingShell title="Create Promotion" description="Create a marketing campaign using the existing promotions backend." actions={<MarketingBackButton />}><PromotionForm action="/admin/promotions" method="post" /></MarketingShell>; 
}
