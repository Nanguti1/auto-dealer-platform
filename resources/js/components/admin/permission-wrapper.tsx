import * as React from 'react';
import { Alert } from '@/components/ui/alert';

interface PermissionWrapperProps {
  allowed: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

export default function PermissionWrapper({
  allowed,
  fallback,
  children,
}: PermissionWrapperProps) {
  if (allowed) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <Alert variant="destructive">
      You do not have permission to view this content.
    </Alert>
  );
}
