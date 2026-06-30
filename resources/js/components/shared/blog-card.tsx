import { Link } from '@inertiajs/react';
import { Calendar, Clock } from 'lucide-react';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface BlogCardProps {
  blog: {
    id: string | number;
    title: string;
    excerpt: string;
    image: string;
    category: string;
    publishedAt: string;
    readTime: string;
    author?: {
      name: string;
      avatar?: string;
    };
  };
  className?: string;
}

export default function BlogCard({ blog, className }: BlogCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Link href={`/blog/${blog.id}`}>
      <Card className={cn('group overflow-hidden transition-all hover:shadow-lg cursor-pointer', className)}>
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            {blog.category}
          </Badge>
        </div>

        <CardContent className="p-6">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>

          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {blog.title}
          </h3>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {blog.excerpt}
          </p>
        </CardContent>

        {blog.author && (
          <CardFooter className="p-6 pt-0">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-semibold text-primary">
                  {blog.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              </div>
              <span className="text-sm font-medium">{blog.author.name}</span>
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
}
