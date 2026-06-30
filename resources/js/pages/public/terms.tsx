import { Head } from '@inertiajs/react';
import { H1, H2, P } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import GuestLayout from '@/layouts/guest/guest-layout';

export default function Terms() {
  return (
    <GuestLayout title="Terms of Service" description="Review the terms governing Dealership website usage, vehicle inquiries, reservations, and customer services.">
      <Head title="Terms of Service" />
      <StickyNav />
      
      <main className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <H1 className="mb-8">Terms of Service</H1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <H2 className="mb-4">Last Updated: January 1, 2024</H2>
                <P>
                  These Terms of Service ("Terms") govern your use of the Dealership website and services. By accessing or using our services, you agree to be bound by these Terms.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Acceptance of Terms</H2>
                <P>
                  By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Changes to Terms</H2>
                <P>
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the updated Terms.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Account Responsibilities</H2>
                <P className="mb-4">You are responsible for:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Maintaining the confidentiality of your account information</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us of unauthorized access to your account</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Vehicle Information</H2>
                <P className="mb-4">While we strive for accuracy:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Vehicle information is provided for informational purposes</li>
                  <li>We recommend verifying details before purchase</li>
                  <li>Prices and availability are subject to change</li>
                  <li>Images may represent actual vehicles or similar models</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Pricing and Payments</H2>
                <P className="mb-4">Regarding pricing and payments:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>All prices are in USD unless otherwise stated</li>
                  <li>Prices do not include taxes, fees, or additional costs</li>
                  <li>Payment methods and terms vary by transaction</li>
                  <li>Financing is subject to credit approval</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Warranties</H2>
                <P>
                  Vehicle warranties vary by manufacturer, vehicle age, and condition. Specific warranty information is provided with each vehicle. We also offer extended warranty options for additional coverage.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Limitation of Liability</H2>
                <P>
                  To the fullest extent permitted by law, Dealership shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Indemnification</H2>
                <P>
                  You agree to indemnify and hold harmless Dealership from any claims arising from your use of our services or violation of these Terms.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Governing Law</H2>
                <P>
                  These Terms are governed by the laws of the state in which Dealership operates, without regard to conflict of law principles.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Contact Us</H2>
                <P>
                  If you have questions about these Terms, please contact us at legal@dealership.com or call (555) 123-4567.
                </P>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </GuestLayout>
  );
}
