import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest/guest-layout';
import StickyNav from '@/components/navigation/sticky-nav';
import Footer from '@/components/navigation/footer';
import { H1, H2, P } from '@/components/design-system/typography';

export default function Privacy() {
  return (
    <GuestLayout title="Privacy Policy" description="Review how Dealership protects customer data, communication preferences, and privacy choices.">
      <Head title="Privacy Policy" />
      <StickyNav />
      
      <main className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <H1 className="mb-8">Privacy Policy</H1>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <H2 className="mb-4">Last Updated: January 1, 2024</H2>
                <P>
                  This Privacy Policy describes how Dealership ("we," "us," or "our") collects, uses, and protects your personal information when you use our website, services, or interact with us.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Information We Collect</H2>
                <P className="mb-4">We collect several types of information to provide you with our services:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Personal information (name, email, phone number, address)</li>
                  <li>Vehicle preferences and search history</li>
                  <li>Financial information for financing applications</li>
                  <li>Vehicle information (for trade-ins and service)</li>
                  <li>Usage data and browsing behavior</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">How We Use Your Information</H2>
                <P className="mb-4">We use your information for various purposes:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>To process vehicle purchases and financing</li>
                  <li>To provide customer service and support</li>
                  <li>To send you marketing communications (with your consent)</li>
                  <li>To improve our services and website</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Information Sharing</H2>
                <P className="mb-4">We may share your information with:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Financial institutions for financing purposes</li>
                  <li>Service providers who assist our operations</li>
                  <li>Law enforcement when required by law</li>
                  <li>Third parties with your explicit consent</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Data Security</H2>
                <P>
                  We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet is completely secure.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Your Rights</H2>
                <P className="mb-4">You have the right to:</P>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Object to processing of your information</li>
                </ul>
              </section>

              <section>
                <H2 className="mb-4">Cookies</H2>
                <P>
                  We use cookies and similar technologies to improve your experience, analyze usage, and assist in our marketing efforts. You can control cookie settings through your browser preferences.
                </P>
              </section>

              <section>
                <H2 className="mb-4">Contact Us</H2>
                <P>
                  If you have questions about this Privacy Policy or your personal information, please contact us at privacy@dealership.com or call (555) 123-4567.
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
