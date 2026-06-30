import { Form } from '@inertiajs/react';
import { Save, X } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';

interface FormShellProps {
  action: string;
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete';
  children: React.ReactNode;
  submitLabel?: string;
  cancelLabel?: string;
  cancelUrl?: string;
  onCancel?: () => void;
  isProcessing?: boolean;
  processingLabel?: string;
  className?: string;
  encType?: 'application/x-www-form-urlencoded' | 'multipart/form-data';
}

export default function FormShell({
  action,
  method = 'post',
  children,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
  cancelUrl,
  onCancel,
  isProcessing = false,
  processingLabel = 'Saving...',
  className = '',
  encType = 'application/x-www-form-urlencoded',
}: FormShellProps) {
  return (
    <Form action={action} method={method} encType={encType} className={className}>
      {({ errors, processing }) => (
        <>
          {(method === 'put' || method === 'patch') && (
            <input type="hidden" name="_method" value={method} />
          )}

          {typeof children === 'function' ? children({ errors, processing }) : children}

          <div className="flex justify-end gap-4 mt-6">
            {cancelUrl && (
              <Button type="button" variant="outline" asChild>
                <a href={cancelUrl}>
                  <X className="mr-2 size-4" />
                  {cancelLabel}
                </a>
              </Button>
            )}
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                <X className="mr-2 size-4" />
                {cancelLabel}
              </Button>
            )}
            <Button type="submit" disabled={processing || isProcessing}>
              <Save className="mr-2 size-4" />
              {processing || isProcessing ? processingLabel : submitLabel}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
}
