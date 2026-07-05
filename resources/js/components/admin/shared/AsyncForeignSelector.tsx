import * as React from 'react';
import { router } from '@inertiajs/react';
import ForeignSelector, { ForeignSelectorOption } from './ForeignSelector';

export interface AsyncForeignSelectorProps {
  name: string;
  label?: string;
  value?: string | number | null;
  url: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
  defaultValue?: string | number | null;
}

export default function AsyncForeignSelector({
  name,
  label,
  value,
  url,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  searchable = true,
  className,
  error,
  defaultValue,
}: AsyncForeignSelectorProps) {
  const [options, setOptions] = React.useState<ForeignSelectorOption[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const fetchOptions = React.useCallback(async () => {
    if (hasLoaded) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      const formattedOptions: ForeignSelectorOption[] = data.map((item: any) => ({
        value: item.id,
        label: item.name || item.title || item.display_name || `${item.first_name} ${item.last_name}` || `#${item.id}`,
        disabled: false,
      }));
      
      setOptions(formattedOptions);
      setHasLoaded(true);
    } catch (error) {
      console.error('Failed to fetch options:', error);
    } finally {
      setIsLoading(false);
    }
  }, [url, hasLoaded]);

  React.useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  return (
    <ForeignSelector
      name={name}
      label={label}
      value={value ?? defaultValue}
      options={options}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      isLoading={isLoading}
      searchable={searchable}
      className={className}
      error={error}
    />
  );
}
