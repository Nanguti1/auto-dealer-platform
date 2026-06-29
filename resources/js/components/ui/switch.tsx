import * as React from 'react';
import { cn } from '@/lib/utils';

interface SwitchProps extends Omit<React.ComponentProps<'button'>, 'onChange' | 'value'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    name?: string;
    value?: string;
}

function Switch({ className, checked, defaultChecked = false, onCheckedChange, name, value = 'on', disabled, ...props }: SwitchProps) {
    const [uncontrolledChecked, setUncontrolledChecked] = React.useState(defaultChecked);
    const isControlled = checked !== undefined;
    const currentChecked = isControlled ? checked : uncontrolledChecked;

    const toggle = () => {
        if (disabled) return;
        const next = !currentChecked;
        if (!isControlled) setUncontrolledChecked(next);
        onCheckedChange?.(next);
    };

    return (
        <>
            {name && <input type="hidden" name={name} value={currentChecked ? value : ''} />}
            <button
                type="button"
                role="switch"
                aria-checked={currentChecked}
                data-state={currentChecked ? 'checked' : 'unchecked'}
                data-slot="switch"
                disabled={disabled}
                onClick={toggle}
                className={cn(
                    'peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none',
                    'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
                    currentChecked ? 'bg-primary' : 'bg-input dark:bg-input/80',
                    className,
                )}
                {...props}
            >
                <span
                    data-slot="switch-thumb"
                    className={cn(
                        'pointer-events-none block size-5 rounded-full bg-background ring-0 transition-transform',
                        currentChecked ? 'translate-x-4' : 'translate-x-0',
                    )}
                />
            </button>
        </>
    );
}

export { Switch };
