import BlogForm from '@/components/admin/cms/blog-form';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';

export default function Create() {
  return (
    <CmsShell
      title="Create Blog Post"
      description="Write and publish a new blog post."
      actions={<CmsBackButton />}
    >
      <BlogForm action="/admin/blog-posts" method="post" />
    </CmsShell>
  );
}
