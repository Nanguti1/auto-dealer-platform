import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import TagForm from '@/components/admin/cms/tag-form';
import type { BlogTag } from '@/components/admin/cms/types';

export default function Edit({ blogTag }: { blogTag: BlogTag }) {
  return (
    <CmsShell
      title="Edit Blog Tag"
      description="Update tag details, color, and visibility."
      actions={<CmsBackButton href={`/admin/blog-tags/${blogTag.id}`} />}
    >
      <TagForm tag={blogTag} action={`/admin/blog-tags/${blogTag.id}`} method="put" />
    </CmsShell>
  );
}
