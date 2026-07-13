import { Link, router } from '@inertiajs/react';
import { Eye, Pencil, Search, Globe, Share2, Plus } from 'lucide-react';
import * as React from 'react';
import adminRoutes from '@/routes/admin';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { SeoSettings, Paginated } from '@/components/admin/cms/types';
import AdminDataTable from '@/components/admin/inventory/admin-data-table';
import type {Column} from '@/components/admin/inventory/admin-data-table';
import { LoadingState, EmptyGeneric, InlineError } from '@/components/admin/shared';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ seoSettings }: { seoSettings: Paginated<SeoSettings> }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);
  const columns: Column<SeoSettings>[] = [
    {
      key: 'site_name',
      label: 'Site Name',
      sortable: true,
      render: (settings) => (
        <div>
          <Link className="font-medium hover:underline" href={`/admin/seo-metadata/${settings.id}`}>
            {settings.site_name ?? 'Untitled'}
          </Link>
          <p className="text-xs text-muted-foreground">{settings.site_description ?? '—'}</p>
        </div>
      ),
    },
    {
      key: 'default_meta_title',
      label: 'Default Meta Title',
      sortable: true,
      render: (settings) => settings.default_meta_title ?? '—',
    },
    {
      key: 'canonical_url',
      label: 'Canonical URL',
      sortable: true,
      render: (settings) => (
        settings.canonical_url ? (
          <span className="text-xs text-muted-foreground truncate max-w-32">{settings.canonical_url}</span>
        ) : (
          '—'
        )
      ),
    },
    {
      key: 'sitemap_enabled',
      label: 'Sitemap',
      render: (settings) => (
        <Badge variant={settings.sitemap_enabled ? 'default' : 'secondary'}>
          {settings.sitemap_enabled ? 'Enabled' : 'Disabled'}
        </Badge>
      ),
    },
  ];

  if (isLoading) {
    return (
      <CmsShell
        title="SEO Metadata"
        description="Manage global SEO settings, Open Graph, and structured data."
        actions={<Button asChild><Link href={adminRoutes.seoMetadata.create().url}><Plus className="mr-2 h-4 w-4" />Create SEO Settings</Link></Button>}
      >
        <LoadingState message="Loading SEO settings..." variant="full-page" />
      </CmsShell>
    );
  }

  if (error) {
    return (
      <CmsShell
        title="SEO Metadata"
        description="Manage global SEO settings, Open Graph, and structured data."
        actions={<Button asChild><Link href={adminRoutes.seoMetadata.create().url}><Plus className="mr-2 h-4 w-4" />Create SEO Settings</Link></Button>}
      >
        <InlineError
          error={error}
          onRetry={() => {
            setError(null);
            router.visit('/admin/seo-metadata');
          }}
        />
      </CmsShell>
    );
  }

  return (
    <CmsShell
      title="SEO Metadata"
      description="Manage global SEO settings, Open Graph, and structured data."
      actions={<Button asChild><Link href={adminRoutes.seoMetadata.create().url}><Plus className="mr-2 h-4 w-4" />Create SEO Settings</Link></Button>}
    >
      {seoSettings.data.length === 0 ? (
        <EmptyGeneric
          title="No SEO settings"
          description="Configure your SEO settings to improve your website's visibility."
          action={{ label: 'Create SEO Settings', onClick: () => router.visit(adminRoutes.seoMetadata.create().url) }}
        />
      ) : (
        <AdminDataTable
        rows={seoSettings}
        columns={columns}
        baseUrl="/admin/seo-metadata"
        rowActions={(settings) => (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/seo-metadata/${settings.id}`}>
                <Eye className="mr-2 size-4" />
                View
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/seo-metadata/${settings.id}/edit`}>
                <Pencil className="mr-2 size-4" />
                Edit
              </Link>
            </Button>
          </div>
        )}
      />
      )}
    </CmsShell>
  );
}
