import CmsShell, { CmsBackButton } from '@/components/admin/cms/cms-shell';
import PermissionForm from '@/components/admin/users/permission-form';

export default function Create() {
  return (
    <CmsShell
      title="Create Permission"
      description="Create a new system permission for role assignment."
      actions={<CmsBackButton />}
    >
      <PermissionForm action="/admin/permissions" method="post" />
    </CmsShell>
  );
}
