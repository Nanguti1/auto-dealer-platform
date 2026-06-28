import * as React from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'default' | 'finance' | 'trade-in' | 'import';
  className?: string;
}

const variantConfig = {
  default: {
    className: 'bg-gradient-to-br from-primary to-primary/80 text-white',
    descriptionClassName: 'text-white/90',
    buttonVariant: 'secondary' as const,
    decorationClassName: 'bg-white/10',
  },
  finance: {
    className: 'bg-gradient-to-br from-green-600 to-green-500 text-white',
    descriptionClassName: 'text-white/90',
    buttonVariant: 'secondary' as const,
    decorationClassName: 'bg-white/10',
  },
  'trade-in': {
    className: 'bg-gradient-to-br from-blue-600 to-blue-500 text-white',
    descriptionClassName: 'text-white/90',
    buttonVariant: 'secondary' as const,
    decorationClassName: 'bg-white/10',
  },
  import: {
    className: 'bg-gradient-to-br from-pink-100 to-pink-200 text-foreground',
    descriptionClassName: 'text-muted-foreground',
    buttonVariant: 'default' as const,
    decorationClassName: 'bg-pink-300/30',
  },
};

export default function CTASection({
  title,
  description,
  buttonText,
  buttonLink,
  variant = 'default',
  className,
}: CTASectionProps) {
  const config = variantConfig[variant];

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-2xl p-6 md:p-8',
        config.className,
        className
      )}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <h2 className="mb-3 text-xl font-bold md:text-2xl">{title}</h2>
        <p className={cn('mb-6 flex-1 text-sm md:text-base', config.descriptionClassName)}>
          {description}
        </p>
        <Button asChild size="lg" variant={config.buttonVariant} className="group w-fit">
          <Link href={buttonLink}>
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <div
        className={cn(
          'absolute top-0 right-0 -mt-16 -mr-16 h-48 w-48 rounded-full blur-3xl',
          config.decorationClassName
        )}
      />
      <div
        className={cn(
          'absolute bottom-0 left-0 -mb-16 -ml-16 h-48 w-48 rounded-full blur-3xl',
          config.decorationClassName
        )}
      />
    </div>
  );
}
