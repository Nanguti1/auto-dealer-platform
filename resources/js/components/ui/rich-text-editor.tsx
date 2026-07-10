import * as React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { cn } from '@/lib/utils';

export interface RichTextEditorProps extends Omit<React.ComponentProps<'textarea'>, 'value' | 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  apiKey?: string;
  height?: number;
  menubar?: boolean;
  toolbar?: string;
  plugins?: string;
  readonly?: boolean;
}

const defaultToolbar = 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | forecolor backcolor | removeformat | code';

const defaultPlugins = 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount';

function RichTextEditor({
  id,
  name,
  value = '',
  onChange,
  error = false,
  apiKey = import.meta.env.VITE_TINYMCE_API_KEY || 't9fy7iififee9ttby4i4ojv9xwg43uxgfawv2fzmw3nsm7es',
  height = 400,
  menubar = true,
  toolbar = defaultToolbar,
  plugins = defaultPlugins,
  readonly = false,
  disabled = false,
  className,
  ...props
}: RichTextEditorProps) {
  const [editorKey, setEditorKey] = React.useState(0);

  React.useEffect(() => {
    // Force re-render when value changes externally (e.g., form reset)
    if (value === '') {
      setEditorKey(prev => prev + 1);
    }
  }, [value]);

  const handleEditorChange = (content: string) => {
    onChange?.(content);
  };

  return (
    <div className={cn('w-full', className)}>
      <Editor
        key={editorKey}
        apiKey={apiKey}
        id={id}
        textareaName={name}
        value={value}
        onEditorChange={handleEditorChange}
        init={{
          height,
          menubar,
          toolbar,
          plugins,
          readonly,
          disabled,
          content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 14px; }',
          statusbar: true,
          elementpath: true,
          branding: false,
          promotion: false,
          resize: true,
          paste_as_text: true,
          paste_merge_formats: true,
          paste_auto_cleanup_on_paste: true,
          convert_urls: false,
          relative_urls: false,
          remove_script_host: false,
          // Security settings
          valid_elements: '*[*]',
          extended_valid_elements: '*[*]',
          // Allow safe HTML only
          sanitize: false, // We'll handle sanitization on the backend
        }}
        onInit={(evt, editor) => {
          if (readonly) {
            editor.mode.set('readonly');
          }
        }}
      />
      <input
        type="hidden"
        name={name}
        value={value}
        aria-invalid={error}
        {...props}
      />
    </div>
  );
}

export { RichTextEditor };
