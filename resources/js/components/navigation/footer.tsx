import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const [email, setEmail] = React.useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className={cn('border-t bg-muted/50', className)}>
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">DL</span>
              </div>
              <span className="text-xl font-bold">Dealership</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner in finding the perfect vehicle. We offer quality vehicles, competitive pricing, and exceptional service.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/inventory" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Inventory
                </Link>
              </li>
              <li>
                <Link href="/finance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/trade-in" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Trade-In
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Service Center
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                <span>123 Dealership Drive<br />City, State 12345</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="h-5 w-5 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="h-5 w-5 shrink-0" />
                <span>info@dealership.com</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="h-5 w-5 shrink-0 mt-0.5" />
                <span>
                  Mon-Fri: 9AM-7PM<br />
                  Sat: 10AM-5PM<br />
                  Sun: Closed
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to our newsletter for exclusive deals and updates.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; 2024 Dealership. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
