import { Star } from 'lucide-react';
import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  testimonial: {
    id: string | number;
    name: string;
    role?: string;
    avatar?: string;
    rating: number;
    content: string;
    date?: string;
  };
  className?: string;
}

export default function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={cn('h-full', className)}>
      <CardContent className="p-6">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              )}
            />
          ))}
        </div>

        <p className="text-muted-foreground mb-6 line-clamp-4">
          "{testimonial.content}"
        </p>

        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback>{getInitials(testimonial.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{testimonial.name}</p>
            {testimonial.role && (
              <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
