import { Head, Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { H1, H2, P, H3 } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import GuestLayout from '@/layouts/guest/guest-layout';

export default function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const faqs = [
    {
      id: '1',
      question: 'What financing options do you offer?',
      answer: 'We offer a variety of financing options to suit different budgets and credit situations. Our finance team works with multiple lenders to get you the best rates possible. We also offer special financing for first-time buyers and those with less-than-perfect credit.',
    },
    {
      id: '2',
      question: 'Do you accept trade-ins?',
      answer: 'Yes, we accept trade-ins! Our team will provide a fair market value for your current vehicle. You can get an estimate online or bring your vehicle to our dealership for a professional appraisal.',
    },
    {
      id: '3',
      question: 'What warranties do you offer?',
      answer: 'We offer various warranty options depending on the vehicle. New vehicles come with manufacturer warranties, and we offer extended warranty options for additional peace of mind. Our certified pre-owned vehicles also come with comprehensive warranty coverage.',
    },
    {
      id: '4',
      question: 'Can I test drive a vehicle before purchasing?',
      answer: 'Absolutely! We encourage test drives to ensure you find the perfect vehicle for your needs. Just bring a valid driver\'s license, and we\'ll get you set up for a test drive at your convenience.',
    },
    {
      id: '5',
      question: 'Do you offer vehicle delivery?',
      answer: 'Yes, we offer vehicle delivery services within a certain radius of our dealership. Contact us for more information about delivery options and any associated fees.',
    },
    {
      id: '6',
      question: 'What types of vehicles do you sell?',
      answer: 'We offer a wide range of vehicles including sedans, SUVs, trucks, crossovers, and luxury vehicles. Our inventory includes both new and pre-owned vehicles from various manufacturers to suit different preferences and budgets.',
    },
    {
      id: '7',
      question: 'How do I schedule a service appointment?',
      answer: 'You can schedule a service appointment online through our website, by phone, or in person at our dealership. We offer flexible scheduling options including early morning and evening appointments.',
    },
    {
      id: '8',
      question: 'Do you offer vehicle inspections?',
      answer: 'Yes, every vehicle on our lot undergoes a comprehensive inspection before being offered for sale. We also offer pre-purchase inspections for vehicles you\'re considering elsewhere.',
    },
  ];

  return (
    <GuestLayout title="FAQ" description="Find answers about inventory, financing, trade-ins, reservations, test drives, delivery, and ownership support.">
      <Head title="FAQ" />
      <StickyNav />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <H1 className="mb-6">Frequently Asked Questions</H1>
              <P className="mb-8">
                Find answers to common questions about our dealership, services, and policies.
              </P>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <Collapsible
                  key={faq.id}
                  open={openItem === faq.id}
                  onOpenChange={(open) => setOpenItem(open ? faq.id : null)}
                  className="border rounded-lg"
                >
                  <CollapsibleTrigger className="flex w-full items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors">
                    <H3 className="font-semibold">{faq.question}</H3>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openItem === faq.id ? 'rotate-180' : ''
                      }`}
                    />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-6 pb-6">
                    <P className="text-muted-foreground">{faq.answer}</P>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>

            {/* Still have questions */}
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <Card className="bg-muted/50">
                <CardContent className="p-8">
                  <H2 className="mb-4">Still have questions?</H2>
                  <P className="mb-6">
                    Can't find the answer you're looking for? Please reach out to our friendly team.
                  </P>
                  <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </GuestLayout>
  );
}
