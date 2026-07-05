import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ForeignSelectorOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface ForeignSelectorProps {
  name: string;
  label?: string;
  value?: string | number | null;
  options: ForeignSelectorOption[];
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
  searchable?: boolean;
  className?: string;
  error?: string;
}

export default function ForeignSelector({
  name,
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  required = false,
  isLoading = false,
  searchable = false,
  className,
  error,
}: ForeignSelectorProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm) return options;
    const lowerSearch = searchTerm.toLowerCase();
    return options.filter(option =>
      option.label.toLowerCase().includes(lowerSearch)
    );
  }, [options, searchTerm, searchable]);

  const handleValueChange = (newValue: string) => {
    onChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label htmlFor={name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <Select
        name={name}
        value={value?.toString() || ''}
        onValueChange={handleValueChange}
        disabled={disabled || isLoading}
        onOpenChange={setIsOpen}
        open={isOpen}
      >
        <SelectTrigger
          className={cn(
            'w-full',
            error && 'border-destructive focus-visible:ring-destructive/20'
          )}
          id={name}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="text-muted-foreground">Loading...</span>
            </div>
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          {searchable && (
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}
          {filteredOptions.length === 0 ? (
            <div className="p-2 text-sm text-muted-foreground">
              {searchTerm ? 'No results found' : 'No options available'}
            </div>
          ) : (
            filteredOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value.toString()}
                disabled={option.disabled}
              >
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
