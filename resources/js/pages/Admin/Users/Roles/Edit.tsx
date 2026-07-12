import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import RoleForm from '@/components/admin/users/role-form';

interface Role {
  id: number;
  name?: string;
  display_name?: string;
  description?: string;
  is_system?: boolean;
}

export default function Edit({ role }: { role: Role }) {
  return (
    <CmsShell
      title="Edit Role"
      description="Update role information."
      actions={<CmsBackButton />}
    >
      <RoleForm action={`/admin/roles/${role.id}`} method="put" role={role} />
    </CmsShell>
  );
}
