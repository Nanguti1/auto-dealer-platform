import * as React from 'react';
import { Link } from '@inertiajs/react';
import { Eye, Pencil, Search, Globe, Share2 } from 'lucide-react';
import AdminDataTable, { type Column } from '@/components/admin/inventory/admin-data-table';
import CmsShell from '@/components/admin/cms/cms-shell';
import type { SeoSettings, Paginated } from '@/components/admin/cms/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function Index({ seoSettings }: { seoSettings: Paginated<SeoSettings> }) {
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

  return (
    <CmsShell
      title="SEO Metadata"
      description="Manage global SEO settings, Open Graph, and structured data."
      actions={null}
    >
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
    </CmsShell>
  );
}
