import adminRoutes from '@/routes/admin';
import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import RoleForm from '@/components/admin/users/role-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Role"
      description="Create a new role."
      actions={<CmsBackButton />}
    >
      <RoleForm action={adminRoutes.roles.store().url} method="post" />
    </CmsShell>
  );
}
