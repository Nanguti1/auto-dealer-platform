import { Link } from '@inertiajs/react';
import { Search, ArrowRight, Play } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
        className
      )}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <img
          src="/images/hero-bg.jpg"
          alt="Luxury vehicles"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center text-white pt-16 pb-20 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="outline" className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
            Premium Automotive Experience
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            Find Your Perfect
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Vehicle
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Discover our curated collection of premium vehicles. From luxury sedans to powerful SUVs, find the car that matches your lifestyle.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/60" />
                <Input
                  placeholder="Search by make, model, or keyword..."
                  className="pl-12 bg-transparent border-0 text-white placeholder:text-white/60 focus-visible:ring-0"
                />
              </div>
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90">
                Search
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="rounded-full group">
              <Link href="/inventory">
                Browse Inventory
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              <Play className="mr-2 h-4 w-4" />
              Watch Video
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 pb-4 md:pb-6 border-t border-white/20">
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-sm text-white/70">Vehicles in Stock</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">50+</div>
              <div className="text-sm text-white/70">Premium Brands</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">98%</div>
              <div className="text-sm text-white/70">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
