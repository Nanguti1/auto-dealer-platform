import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import RoleForm from '@/components/admin/users/role-form';

interface Permission {
  id: number;
  name: string;
  display_name: string;
  module: string;
}

interface Role {
  id: number;
  name?: string;
  display_name?: string;
  description?: string;
  is_system?: boolean;
  permissions?: Permission[];
}

export default function Edit({ role, permissions = [] }: { role: Role; permissions?: Permission[] }) {
  return (
    <CmsShell
      title="Edit Role"
      description="Update role information and permission assignments."
      actions={<CmsBackButton />}
    >
      <RoleForm action={`/admin/roles/${role.id}`} method="put" role={role} permissions={permissions} />
    </CmsShell>
  );
}
