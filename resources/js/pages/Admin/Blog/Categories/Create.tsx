import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import CategoryForm from '@/components/admin/cms/category-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Blog Category"
      description="Create a new blog post category for content organization."
      actions={<CmsBackButton />}
    >
      <CategoryForm action="/admin/blog-categories" method="post" />
    </CmsShell>
  );
}
