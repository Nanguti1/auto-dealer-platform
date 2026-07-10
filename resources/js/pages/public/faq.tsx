import { Head, Link } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { H1, H2, P, H3 } from '@/components/design-system/typography';
import Footer from '@/components/navigation/footer';
import StickyNav from '@/components/navigation/sticky-nav';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import GuestLayout from '@/layouts/guest/guest-layout';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FAQProps {
  faqs: FAQ[];
}

export default function FAQ({ faqs }: FAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

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
              {faqs.length > 0 ? faqs.map((faq) => (
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
              )) : (
                <p className="text-center text-muted-foreground">No FAQs available at this time.</p>
              )}
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
