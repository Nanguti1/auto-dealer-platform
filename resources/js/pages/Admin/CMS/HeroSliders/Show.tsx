import { Link } from '@inertiajs/react';
import { Pencil, Calendar, ArrowRight, Image as ImageIcon } from 'lucide-react';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import type { HeroSlider } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Show({ heroSlider }: { heroSlider: HeroSlider }) {
  return (
    <CmsShell
      title={heroSlider.title ?? 'Untitled Slider'}
      description={heroSlider.subtitle ?? ''}
      actions={
        <>
          <CmsBackButton />
          <Button asChild>
            <Link href={`/admin/hero-sliders/${heroSlider.id}/edit`}>
              <Pencil className="mr-2 size-4" />
              Edit
            </Link>
          </Button>
        </>
      }
    >
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {heroSlider.image_path ? (
                <img
                  src={heroSlider.image_path}
                  alt={heroSlider.title ?? 'Hero slider'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  <ImageIcon className="size-12" />
                </div>
              )}
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <h2 className="text-2xl font-bold">{heroSlider.title ?? 'No title'}</h2>
                {heroSlider.subtitle && <p className="text-lg opacity-90">{heroSlider.subtitle}</p>}
                {heroSlider.cta_button_text && (
                  <Button className="mt-4 w-fit bg-white text-black hover:bg-gray-100">
                    {heroSlider.cta_button_text}
                    {heroSlider.cta_button_url && <ArrowRight className="ml-2 size-4" />}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Slider details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">CTA Button Text:</span>
                <p className="text-sm font-medium">{heroSlider.cta_button_text ?? '—'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">CTA Button URL:</span>
                <p className="text-sm font-medium">{heroSlider.cta_button_url ?? '—'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Display Order:</span>
                <p className="text-sm font-medium">{heroSlider.display_order ?? 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={heroSlider.is_active ? 'default' : 'secondary'}>
                  {heroSlider.is_active ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant={heroSlider.is_published ? 'default' : 'secondary'}>
                  {heroSlider.is_published ? 'Published' : 'Draft'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timestamps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Created:</span>
                <span className="text-sm font-medium">
                  {heroSlider.created_at ? new Date(heroSlider.created_at).toLocaleDateString() : '—'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated:</span>
                <span className="text-sm font-medium">
                  {heroSlider.updated_at ? new Date(heroSlider.updated_at).toLocaleDateString() : '—'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </CmsShell>
  );
}
