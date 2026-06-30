import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import PermissionForm from '@/components/admin/users/permission-form';

interface Permission {
  id: number;
  name?: string;
  display_name?: string;
  module?: string;
  description?: string;
}

export default function Edit({ permission }: { permission: Permission }) {
  return (
    <CmsShell
      title="Edit Permission"
      description="Update permission information."
      actions={<CmsBackButton />}
    >
      <PermissionForm action={`/admin/permissions/${permission.id}`} method="put" permission={permission} />
    </CmsShell>
  );
}
