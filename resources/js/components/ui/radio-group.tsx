import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadioGroupContextValue {
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

interface RadioGroupProps extends Omit<React.ComponentProps<'div'>, 'onChange' | 'defaultValue'> {
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onValueChange?: (value: string) => void;
}

function RadioGroup({ className, name, value, defaultValue, disabled, onValueChange, ...props }: RadioGroupProps) {
    const generatedName = React.useId();

    return (
        <RadioGroupContext.Provider value={{ name: name ?? generatedName, value, defaultValue, disabled, onValueChange }}>
            <div role="radiogroup" data-slot="radio-group" className={cn('grid gap-3', className)} {...props} />
        </RadioGroupContext.Provider>
    );
}

interface RadioGroupItemProps extends Omit<React.ComponentProps<'input'>, 'type' | 'onChange'> {
    value: string;
    onValueChange?: (value: string) => void;
}

function RadioGroupItem({ className, value, disabled, onValueChange, ...props }: RadioGroupItemProps) {
    const context = React.useContext(RadioGroupContext);
    const isControlled = context?.value !== undefined;
    const checked = isControlled ? context?.value === value : undefined;

    return (
        <span className="relative inline-flex size-4 items-center justify-center">
            <input
                type="radio"
                data-slot="radio-group-item"
                name={context?.name}
                value={value}
                checked={checked}
                defaultChecked={!isControlled ? context?.defaultValue === value : undefined}
                disabled={disabled ?? context?.disabled}
                onChange={() => {
                    context?.onValueChange?.(value);
                    onValueChange?.(value);
                }}
                className={cn(
                    'peer size-4 appearance-none rounded-full border border-input shadow-xs transition-all outline-none',
                    'checked:border-primary checked:bg-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                    'disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
                    className,
                )}
                {...props}
            />
            <span className="pointer-events-none absolute size-1.5 scale-0 rounded-full bg-primary-foreground transition-transform peer-checked:scale-100" />
        </span>
    );
}

export { RadioGroup, RadioGroupItem };
