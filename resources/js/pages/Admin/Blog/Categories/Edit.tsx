import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import CategoryForm from '@/components/admin/cms/category-form';
import type { BlogCategory } from '@/components/admin/cms/types';

export default function Edit({ blogCategory }: { blogCategory: BlogCategory }) {
  return (
    <CmsShell
      title="Edit Blog Category"
      description="Update category details, visibility, and ordering."
      actions={<CmsBackButton href={`/admin/blog-categories/${blogCategory.id}`} />}
    >
      <CategoryForm category={blogCategory} action={`/admin/blog-categories/${blogCategory.id}`} method="put" />
    </CmsShell>
  );
}
