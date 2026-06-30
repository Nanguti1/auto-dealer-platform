import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import InputError from '@/components/input-error';

export type FieldType = 'text' | 'email' | 'number' | 'password' | 'tel' | 'url' | 'date' | 'datetime-local' | 'time' | 'textarea' | 'select' | 'switch' | 'checkbox';

interface FormFieldProps {
  name: string;
  label: string;
  type?: FieldType;
  value?: string | number | boolean | null;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number | string;
  max?: number | string;
  step?: string;
  options?: Array<{ value: string; label: string }>;
  className?: string;
  id?: string;
  onChange?: (value: string | boolean) => void;
  hint?: string;
}

export default function FormField({
  name,
  label,
  type = 'text',
  value,
  error,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,
  min,
  max,
  step,
  options = [],
  className = '',
  id,
  onChange,
  hint,
}: FormFieldProps) {
  const fieldId = id || name;
  const hasError = Boolean(error);

  const renderInput = () => {
    const baseProps = {
      id: fieldId,
      name,
      disabled,
      readOnly,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined,
    };

    switch (type) {
      case 'textarea':
        return (
          <Textarea
            {...baseProps}
            placeholder={placeholder}
            value={String(value ?? '')}
            onChange={(e) => onChange?.(e.target.value)}
            className={hasError ? 'border-destructive' : ''}
          />
        );

      case 'select':
        return (
          <select
            {...baseProps}
            value={String(value ?? '')}
            onChange={(e) => onChange?.(e.target.value)}
            className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${hasError ? 'border-destructive' : ''}`}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'switch':
        return (
          <Switch
            {...baseProps}
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange?.(checked)}
          />
        );

      case 'checkbox':
        return (
          <input
            {...baseProps}
            type="checkbox"
            checked={Boolean(value)}
            onChange={(e) => onChange?.(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
        );

      default:
        return (
          <Input
            {...baseProps}
            type={type}
            placeholder={placeholder}
            value={String(value ?? '')}
            required={required}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange?.(e.target.value)}
            className={hasError ? 'border-destructive' : ''}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={fieldId}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {renderInput()}
      {hint && !hasError && (
        <p id={`${fieldId}-hint`} className="text-sm text-muted-foreground">
          {hint}
        </p>
      )}
      {hasError && (
        <InputError id={`${fieldId}-error`} message={error} />
      )}
    </div>
  );
}
