import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import RoleForm from '@/components/admin/users/role-form';

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
}

export default function Create({ permissions = [] }: { permissions?: Permission[] }) {
  return (
    <CmsShell
      title="Create Role"
      description="Create a new role with specific permissions."
      actions={<CmsBackButton />}
    >
      <RoleForm action={adminRoutes.roles.store().url} method="post" permissions={permissions} />
    </CmsShell>
  );
}
