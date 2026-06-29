import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  className?: string;
}

export default function MegaMenu({ className }: MegaMenuProps) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {/* Inventory Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inventory</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] grid-cols-2 gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md group"
                    href="/inventory"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium group-hover:text-primary transition-colors">
                      Browse All Inventory
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Explore our extensive collection of quality vehicles
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/new"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">New Vehicles</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest models from top manufacturers
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/used"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Used Vehicles</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Quality pre-owned vehicles at great prices
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/certified"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Certified Pre-Owned</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Manufacturer certified with warranty
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/suv"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">SUVs & Crossovers</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Spacious and versatile family vehicles
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/truck"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Trucks</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Powerful trucks for work and play
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/sedan"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Sedans</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Efficient and comfortable daily drivers
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/electric"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Electric & Hybrid</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Eco-friendly electric and hybrid vehicles
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/inventory/luxury"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Luxury Vehicles</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Premium luxury cars and SUVs
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Services Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>Services</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/finance/calculator"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Finance Center</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get pre-approved and explore financing options
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/trade-in/request"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Trade-In Value</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get the best value for your current vehicle
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/faq"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Service & FAQ</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Schedule maintenance and repairs
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/contact"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Parts Concierge</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Genuine OEM parts and accessories
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* About Menu */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>About</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/about"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">About Us</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about our dealership and values
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/team"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Our Team</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Meet our experienced staff
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/careers"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Careers</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Join our growing team
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground group"
                    href="/blog"
                  >
                    <div className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Blog & News</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest automotive news and tips
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Contact Link */}
        <NavigationMenuItem>
          <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
