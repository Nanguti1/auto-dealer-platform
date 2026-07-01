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

interface User {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  branch_id?: number;
  roles?: Role[];
  branch?: Branch;
  preferences?: Record<string, any>;
}

export default function Edit({ user, roles = [], branches = [] }: { user: User; roles?: Role[]; branches?: Branch[] }) {
  return (
    <CmsShell
      title="Edit User"
      description="Update user information and role assignments."
      actions={<CmsBackButton />}
    >
      <UserForm action={`/admin/users/${user.id}`} method="put" user={user} roles={roles} branches={branches} />
    </CmsShell>
  );
}
