import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import BlogForm from '@/components/admin/cms/blog-form';

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
