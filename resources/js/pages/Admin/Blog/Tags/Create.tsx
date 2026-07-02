import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import TagForm from '@/components/admin/cms/tag-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Blog Tag"
      description="Create a new blog post tag for content tagging."
      actions={<CmsBackButton />}
    >
      <TagForm action={adminRoutes.blogTags.store().url} method="post" />
    </CmsShell>
  );
}
