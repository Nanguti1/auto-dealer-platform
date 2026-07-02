import adminRoutes from '@/routes/admin';
import CategoryForm from '@/components/admin/cms/category-form';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';

export default function Create() {
  return (
    <CmsShell
      title="Create Blog Category"
      description="Create a new blog post category for content organization."
      actions={<CmsBackButton />}
    >
      <CategoryForm action={adminRoutes.blogCategories.store().url} method="post" />
    </CmsShell>
  );
}
