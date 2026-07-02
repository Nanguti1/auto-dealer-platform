import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import UserForm from '@/components/admin/users/user-form';

interface Role {
  id: number;
  name: string;
  display_name: string;
}

interface Branch {
  id: number;
  name: string;
}

export default function Create({ roles = [], branches = [] }: { roles?: Role[]; branches?: Branch[] }) {
  return (
    <CmsShell
      title="Create User"
      description="Create a new user account with appropriate roles."
      actions={<CmsBackButton />}
    >
      <UserForm action={adminRoutes.users.store().url} method="post" roles={roles} branches={branches} />
    </CmsShell>
  );
}
