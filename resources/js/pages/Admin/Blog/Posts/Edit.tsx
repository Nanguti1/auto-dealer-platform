import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import BlogForm from '@/components/admin/cms/blog-form';
import type { BlogPost } from '@/components/admin/cms/types';

export default function Edit({ blogPost }: { blogPost: BlogPost }) {
  return (
    <CmsShell
      title="Edit Blog Post"
      description="Update blog post content and publication settings."
      actions={<CmsBackButton href={`/admin/blog-posts/${blogPost.id}`} />}
    >
      <BlogForm blogPost={blogPost} action={`/admin/blog-posts/${blogPost.id}`} method="put" />
    </CmsShell>
  );
}
