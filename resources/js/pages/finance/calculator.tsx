import PublicLayout from '@/layouts/public/public-layout';
import { Head } from '@inertiajs/react';
import { FinanceCalculator } from '@/components/vehicles';
import { H1, P } from '@/components/design-system/typography';
import { Badge } from '@/components/ui/badge';
import CTASection from '@/components/shared/cta-section';

export default function FinanceCalculatorPage() {
    return (
        <PublicLayout title="Finance Calculator">
            <Head title="Finance Calculator" />

            <section className="border-b bg-gradient-to-b from-muted/50 to-background py-12 md:py-16">
                <div className="container max-w-3xl text-center">
                    <Badge className="mb-3">Finance</Badge>
                    <H1 className="mb-4">Finance Calculator</H1>
                    <P>Estimate your monthly payments and plan your purchase with confidence.</P>
                </div>
            </section>

            <section className="py-14">
                <div className="container max-w-lg">
                    <FinanceCalculator defaultPrice={65000} />
                </div>
            </section>

            <section className="pb-20">
                <div className="container">
                    <CTASection
                        title="Get Pre-Approved Today"
                        description="Secure financing before you shop. Get pre-approved in minutes."
                        buttonText="Apply for Financing"
                        buttonLink="/finance"
                        variant="finance"
                    />
                </div>
            </section>
        </PublicLayout>
    );
}
