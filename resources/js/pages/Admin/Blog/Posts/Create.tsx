import adminRoutes from '@/routes/admin';
import BlogForm from '@/components/admin/cms/blog-form';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';

export default function Create() {
  return (
    <CmsShell
      title="Create Blog Post"
      description="Write and publish a new blog post."
      actions={<CmsBackButton />}
    >
      <BlogForm action={adminRoutes.blogPosts.store().url} method="post" />
    </CmsShell>
  );
}
